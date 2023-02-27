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

import { ActionRoomMessage } from './messages/action-room.message';
import { JoinRoomMessage } from './messages/join-room.message';
import { MessageRoomMessage } from './messages/message-room.message';

@WebSocketGateway({
  namespace: '/room',
  cors: {
    origin: [config.clientUrl],
    httpOnly: true,
    credentials: true,
  },
})
export class RoomGateway implements OnGatewayInit {
  constructor(private readonly dataService: IDataService) {}

  @WebSocketServer() wss: Server;
  afterInit() {
    Logger.log('Room gateway initialized');
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('join_room')
  async join(@ConnectedSocket() client: Socket, @MessageBody() { roomId }: JoinRoomMessage) {
    client.join(roomId);
    client.emit('joined_room');
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('send_message_room')
  message(
    @User() user: UserEntity,
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId, message }: MessageRoomMessage,
  ) {
    client.emit('message_room', { user, message });
    client.to(roomId).emit('message_room', { user, message });
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('send_action_room')
  action(
    @User() user: UserEntity,
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId, key, data }: ActionRoomMessage,
  ) {
    client.to(roomId).emit('action_room', { user, key, data });
  }
}
