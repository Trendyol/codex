import { UserEntity } from "@core/data/entities";

export class MessageLobbyMessage {
  user: UserEntity;
  lobbyId: string;
  message: string;
}
