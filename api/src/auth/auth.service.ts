import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    signUp(signUpDto) {
        // console.log('SIGN UP DTO:', signUpDto) the data will show up in the nestjs console
        return signUpDto; //data will show up in the inspect browser console under data
    }
}
