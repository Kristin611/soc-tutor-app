import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/users/entities/user.entity'; //not sure if this is the right file path
import { sendMail } from './mail';
import { config as dotenvConfig } from 'dotenv';
import { resetPWTemplate } from './reset-pw-template';
dotenvConfig();

@Injectable()
export class MailService {
    async sendPWResetEmail(user: User, token: string) {
        //console.log('MAILER USER', user);
        //console.log('MAILER TOKEN', token)
        sendMail({
            from: process.env.EMAIL_USERNAME,
            to: user.email,
            subject: "Sociology Tutor: Reset Your Password",
            html: resetPWTemplate(token, user.id),
        }, () => {
            console.log('password reset email sent')
        })
    }
}
//console.log('EMAIL USERNAME', process.env.EMAIL_USERNAME)