import {UserEntity} from "@core/data/entities";

import {MAIL_TEMPLATES} from "../../../modules/providers/mail/models/enums";

export type Attachment = {
  filename: string;
  path: string;
  cid: string;
}
export type CodexMailOptions = {
  from?: string;
  subject: string;
  template: MAIL_TEMPLATES;
  context?: object;
  attachments?: Attachment[];
}
export abstract class IMailService<T> {
  abstract send: (user: UserEntity, options?: CodexMailOptions) => Promise<T>;
}
