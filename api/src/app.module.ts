import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { AuthModule } from './auth/auth.module';
import typeorm from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //config accessible in all files
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule, //allows us to @InjectRepository in UsersService (app.service)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('Database Host:', process.env.DATABASE_HOST);
    console.log('Database Port:', process.env.DATABASE_PORT);
    console.log('Database Username:', process.env.DB_USERNAME);
    console.log('Database Name:', process.env.DATABASE_NAME);
  }
}
