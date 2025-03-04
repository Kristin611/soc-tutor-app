import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor( //injecting user entity via constructor and repository
    @InjectRepository(User)
    private usersRespository: Repository<User>,
  ) {}

  async addUser(userData: {name: string; username: string; email: string; password: string}) {
    console.log('USER DATA:', userData);
    //take the user's data and save it to the user table in the db
    await this.usersRespository.save(userData);
    return await this.getUsers();
  }

  async getUsers() {
    //get all users from database
    return await this.usersRespository.find(); 
  }
}
