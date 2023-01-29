import { IDataService } from '@core/data/services/data.service';
import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { JoinRoomMessage } from './messages/join-room.message';

@WebSocketGateway({ namespace: '/room', cors: true })
export class RoomGateway implements OnGatewayInit {
  constructor(private readonly dataService: IDataService) {}

  @WebSocketServer() wss: Server;
  afterInit() {
    Logger.log('Room gateway initialized');
  }

  @SubscribeMessage('join_room')
  async join(@ConnectedSocket() client: Socket, @MessageBody() { roomId }: JoinRoomMessage) {
    client.join(roomId);
    client.emit('joined_room');
  }
}
