import { Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/auth/auth.controller';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async createUser(user: SignUpDto) {
        console.log('User', user);
        return await this.usersRepository.save({ ...user })
    }
}
