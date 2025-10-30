import { Module } from '@nestjs/common';
import { SociologyController } from './soc.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from '../auth/auth.guard';

@Module({
    controllers: [SociologyController],
    providers: [AuthGuard], // register authguard as provider
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '20m'}
            }),
            inject: [ConfigService],
        }),
    ],
})

export class SociologyModule {}