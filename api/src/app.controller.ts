import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //Alternative way to do a Post request
  // @Post('/name')
  // async addName(@Body() body: string) {
  //   console.log('body:', body)
  //   return 'Yay!';
  // }

  @Post('/user')
  async addUser(@Body() userData: {name: string; username: string; email: string; password: string}) {
    console.log('body:', userData)
    return await this.appService.addUser(userData);
  }


  @Get()
  async getUsers() {
    return this.appService.getUsers();
  }
}
