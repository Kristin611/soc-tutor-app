import { Body, Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsNotEmpty } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';
import { Transform } from 'class-transformer'; 
import { AuthGuard } from './auth.guard';

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

    @UseGuards(AuthGuard) //UseGuards adding user info to the request
    @Get('user-details')
    getUser(@Request() req) {
        if (req.user) {
            return req.user;
        } else {
            return 'no user';
        }
        
    }
}
