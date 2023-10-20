import config from '@core/config/configuration';
import { UserEntity } from '@core/data/entities';
import { CodexMailOptions, IMailService } from "@core/data/services/mail.service";
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { MAIL_DEFAULT_FROM, MAIL_DEFAULT_SUBJECT } from "./models/constants";

@Injectable()
export class MailService implements IMailService<any> {
    constructor(private mailerService: MailerService) {}

    async send(user: UserEntity, options: CodexMailOptions) {
        try {
            if(Boolean(config.mail.isEnabled)){
                await this.mailerService.sendMail({
                    to: user.email,
                    from: options.from || MAIL_DEFAULT_FROM,
                    subject: options.subject || MAIL_DEFAULT_SUBJECT,
                    template: options.template,
                    attachments:options.attachments ?? [],
                    context: {
                        name: user.name,
                        discord: config.social.discord,
                        email: config.social.email,
                        ...options?.context
                    },
                });
            }
        } catch (e){
            console.warn("Mail could not send: ", e);
        }
    }
}
