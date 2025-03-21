import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

type SignUpDto = {
    name: string;
    username: string;
    email: string;
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
