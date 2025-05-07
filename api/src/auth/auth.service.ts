import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccountDetailDto, LogInDto, SignUpDto } from './auth.controller';

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
         (await this.usersService.findUserByUsername(signUpDto.username))?.username; // the ? is to see the error message in console under response -> data.message
        console.log('USER EXISTS', usernameExists);

        //check if email already exists
        const emailExists = 
        (await this.usersService.findUserByEmail(signUpDto.email))?.email;
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

    // vertify PW for users logging in
    async verifyPW(enteredPW: string, userPW: string) {
        return await bcrypt.compare(enteredPW, userPW); //bcrypt will give a true or false
    }

    async logIn(logInDto: LogInDto) {
        //console.log('LOG IN DTO', logInDto);

        //check that user exists by finding user by username
        const user = await this.usersService.findUserByUsername(logInDto.username);
        console.log('USER', user);

        // if user doesnt exist throw unauthorized error
        if (!user) {
            throw new UnauthorizedException('Username does not exist.'); //remove log message so hackers can't see what the issue is
        }

        //verify that PWs match
        const matchPW = await this.verifyPW(
            logInDto.password,
            user.password
        );
        console.log('PASSWORDS MATCH:', matchPW);

        // if the pws dont match throw unauthorized error
        if (!matchPW) {
            throw new UnauthorizedException('Passwords do not match.');
        }

        //create and return an access token to the user
        return await this.createAccessToken(user);
    }

    async changeAccountDetail(accountDetailDto: AccountDetailDto) {

        //find user with username
        const user = await this.usersService.findUserByUsername(
            accountDetailDto.username,
        );
        //console.log('USER NAME', user.name);

        // hash PW when user changes it on frontend
        if (accountDetailDto.field === 'password') {
            const plainTextPW = accountDetailDto.value;
            const hashedPW = await this.hashPassword(plainTextPW);
            user[accountDetailDto.field] = hashedPW;
        } else {
            //update the field in question on that user
            user[accountDetailDto.field] = accountDetailDto.value;
        }

        //save the user in db and return user data
        return await this.usersService.createUser(user);

        // console.log('ACCOUNT DETAIL DTO', accountDetailDto);
    };

    async getProfileData(username: string) {
        console.log('USERNAME AUTH CONTROLLER:', username);
        const user = this.usersService.findUserByUsername(username);
        return {
            name: (await user).name,
            username: (await user).username,
            email: (await user).email
        }

    }
}
