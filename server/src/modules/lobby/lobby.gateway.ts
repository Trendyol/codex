import { WsGuard } from '@auth/guards/ws.guard';
import config from '@core/config/configuration';
import { UserEntity } from '@core/data/entities';
import { IDataService } from '@core/data/services/data.service';
import { User } from '@core/decorators/user.decorator';
import { Logger, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { JoinLobbyMessage } from './messages/join-lobby.message';
import { MessageLobbyMessage } from './messages/message-lobby.message';

@WebSocketGateway({
  namespace: '/lobby',
  cors: {
    origin: [config.clientUrl],
    httpOnly: true,
    credentials: true,
  },
})
export class LobbyGateway implements OnGatewayInit {
  constructor(private readonly dataService: IDataService) {}
  lobbies: Record<string, Array<UserEntity>> = {};
  @WebSocketServer() wss: Server;

  afterInit() {
    Logger.log('Lobby gateway initialized');
  }

  getActiveParticipants = (lobbyId: string, user: UserEntity) => {
    if (!this.lobbies[lobbyId]) {
      this.lobbies[lobbyId] = [];
    }
    if (!this.lobbies[lobbyId].find((u) => u.id === user.id)) {
      this.lobbies[lobbyId].push(user);
    }

    return this.lobbies[lobbyId];
  };

  @SubscribeMessage('join_lobby')
  async join(
    @ConnectedSocket() client: Socket,
    @MessageBody() { lobbyId, participantId }: JoinLobbyMessage,
  ) {
    const participant = await this.dataService.users.findById(participantId);
    const activeParticipants = this.getActiveParticipants(lobbyId, participant);

    client.join(lobbyId);
    client.emit('joined_lobby', activeParticipants);
    client.to(lobbyId).emit('joined_lobby', activeParticipants);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('send_message_lobby')
  message(
    @User() user: UserEntity,
    @ConnectedSocket() client: Socket,
    @MessageBody() { lobbyId, message }: MessageLobbyMessage,
  ) {
    client.emit('message_lobby', { user, message });
    client.to(lobbyId).emit('message_lobby', { user, message });
  }
}
