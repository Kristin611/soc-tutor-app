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
    @Transform((params) => sanitizeHtml(params.value))
    password: string;
}

export class LogInDto {
    @IsNotEmpty()
    @Transform((params) => sanitizeHtml(params.value))
    username: string;

    @IsNotEmpty()
    @Transform((params) => sanitizeHtml(params.value))
    password: string;
}

export class AccountDetailDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    field: string; //fields are already in database so do not need to transform them

    @IsNotEmpty()
    @Transform((params) => sanitizeHtml(params.value)) //since it is new input from the user we do want to transform it
    value: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('sign-up')
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }

    @Post('log-in')
    logIn(@Body() logInDto: LogInDto) {
        return this.authService.logIn(logInDto);
    }

    @UseGuards(AuthGuard) //bc it is a protected route
    @Post('change-account-detail')
    changeAccountDetail(@Body() accountDetailDto: AccountDetailDto) {
        return this.authService.changeAccountDetail(accountDetailDto)
    }

    @UseGuards(AuthGuard) //UseGuards adding user info to the request
    @Get('profile')
    getProfileData(@Request() req) {
        return this.authService.getProfileData(req.user.username)
        
    }
}
