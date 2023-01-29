import { IDataService } from '@core/data/services/data.service';
import { Logger } from '@nestjs/common';
import { OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway({ namespace: '/room', cors: true })
export class RoomGateway implements OnGatewayInit {
  constructor(private readonly dataService: IDataService) {}

  @WebSocketServer() wss: Server;
  afterInit() {
    Logger.log('Room gateway initialized');
  }
}
