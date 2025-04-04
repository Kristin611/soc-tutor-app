import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {} //now we can call a function within our usersService

    async hashPassword(password: string) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds)
    }

    async signUp(signUpDto) {
        //console.log('SIGN UP DTO:', signUpDto) //the data will show up in the nestjs console
        //return signUpDto; //data will show up in the inspect browser console under data
        
        // check if username already exists
        //check is email already exists

        //hash password
        const hashedPW = await this.hashPassword(signUpDto.password);
        signUpDto.password = hashedPW; //so it shows up hashed in DB
        console.log('HASHED PW:', hashedPW);

        //add user to user table: create function in users.service
        this.usersService.createUser(signUpDto);
        return 'fake token'; //returning fake token to test
    }
}
