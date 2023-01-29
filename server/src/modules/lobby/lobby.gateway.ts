import { UserEntity } from '@core/data/entities';
import { IDataService } from '@core/data/services/data.service';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/lobby', cors: true })
export class LobbyGateway implements OnGatewayInit {
  constructor(private readonly dataService: IDataService) {}
  lobbies: Record<string, Array<UserEntity>> = {};
  @WebSocketServer() wss: Server;

  afterInit() {
    console.log('Connected to room namespace');
  }

  handleLobbyJoin = (lobbyId: string, user: UserEntity) => {
    if (!this.lobbies[lobbyId]) {
      this.lobbies[lobbyId] = [];
    }
    if (!this.lobbies[lobbyId].find((u) => u.id === user.id)) {
      this.lobbies[lobbyId].push(user);
    }

    return this.lobbies[lobbyId];
  };

  @SubscribeMessage('join')
  async join(
    @ConnectedSocket() client: Socket,
    @MessageBody() { lobbyId, participantId }: { lobbyId: string; participantId: string },
  ) {
    const participant = await this.dataService.users.findById(participantId);
    const activeParticipants = this.handleLobbyJoin(lobbyId, participant);

    client.join(lobbyId);
    client.emit('joined', activeParticipants);

    client.to(lobbyId).emit('joinedRoom', participant);
  }
}
