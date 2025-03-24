import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsNotEmpty } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';
import { Transform } from 'class-transformer'; 

export class SignUpDto {
    @IsNotEmpty()
    @Transform((params) => sanitizeHtml(params.value)) //sanitize html
    name: string;

    @IsNotEmpty()
    @Transform((params) => sanitizeHtml(params.value))
    username: string;

    @IsEmail()
    @Transform((params) => sanitizeHtml(params.value))
    email: string;

    @IsNotEmpty()
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('sign-up')
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }
}
