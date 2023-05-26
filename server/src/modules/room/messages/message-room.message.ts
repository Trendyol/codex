import { UserEntity } from '@core/data/entities';

export class MessageRoomMessage {
  user: UserEntity;
  roomId: string;
  message: string;
}
