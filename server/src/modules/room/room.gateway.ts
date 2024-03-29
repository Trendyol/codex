import { WsGuard } from '@auth/guards/ws.guard';
import { Status } from '@challenge/models/enums';
import config from '@core/config/configuration';
import { IDataService } from '@core/data/services/data.service';
import { Logger, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { DateTime } from 'luxon';
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
  transports: ['websocket'],
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
    @ConnectedSocket() client: Socket,
    @MessageBody() { user, roomId, message }: MessageRoomMessage,
  ) {
    const timestamp = DateTime.now().toISO();
    client.emit('message_room', { user, message, timestamp });
    client.to(roomId).emit('message_room', { user, message, timestamp });
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('send_action_room')
  action(
    @ConnectedSocket() client: Socket,
    @MessageBody() { user, roomId, key, data }: ActionRoomMessage,
  ) {
    client.to(roomId).emit('action_room', { user, key, data });
  }

  changeStatus(roomId: string, status: Status) {
    this.wss.to(roomId).emit('change_status', status);
  }
}
