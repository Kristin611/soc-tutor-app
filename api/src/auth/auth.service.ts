import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './auth.controller';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {} //now we can call a function within our usersService

    async hashPassword(password: string) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds)
    }

    async createAccessToken(user) {
        const payload = { sub: user.userId, username: user.username };
    return await this.jwtService.signAsync(payload);
    
    }

    async signUp(signUpDto: SignUpDto) {
        //console.log('SIGN UP DTO:', signUpDto) //the data will show up in the nestjs console
        //return signUpDto; //data will show up in the inspect browser console under data
        
        // check if username already exists
        const usernameExists = 
         (await this.usersService.findUserByUsername(signUpDto.username)).length > 0;
        console.log('USER EXISTS', usernameExists);

        //check if email already exists
        const emailExists = 
        (await this.usersService.findUserByEmail(signUpDto.email)).length > 0;
        console.log('EMAIL EXISTS', emailExists);

        if (usernameExists) {
            throw new BadRequestException('Username already exists.')
        };

        if (emailExists) {
            throw new BadRequestException('Email already exists.')
        };

        //hash password
        const hashedPW = await this.hashPassword(signUpDto.password);
        signUpDto.password = hashedPW; //so it shows up hashed in DB
        console.log('HASHED PW:', hashedPW);

        //add user to user table: create function in users.service
        const user = await this.usersService.createUser(signUpDto);
        console.log('USER', user);
        //return 'fake token'; //returning fake token to test

        return await this.createAccessToken(user); //returning real token
    }
}
