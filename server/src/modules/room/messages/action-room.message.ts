import { UserEntity } from '@core/data/entities';

export class ActionRoomMessage {
  user: UserEntity;
  roomId: string;
  key: string;
  data: any;
}
