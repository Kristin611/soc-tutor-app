
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
    //import { jwtConstants } from './constants';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
        console.log('AuthGuard initialized'); //log when guard is initialized
    }
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      console.log('AuthGuard.canActivate() called'); //log when guard is invoked

      const request = context.switchToHttp().getRequest();
      console.log('Request object:', {
        method: request.method,
        path: request.path,
        headers: request.headers
      }); // log basic request info

      const token = this.extractTokenFromHeader(request);
      console.log('Extracted token:', token)

      if (!token) {
        console.log('No token found in request'); // log when token is missing
        throw new UnauthorizedException();
      }
      try {
        console.log('Attempting to verify token...')
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.JWT_SECRET
          }
        );

        console.log('Token payload:', payload); // log the decoded payload

        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
        console.log('Payload assigned to request.user'); // log assignment
      } catch (error) {
        console.error('Token verification failed:', error.message); // log verification errors
        throw new UnauthorizedException();
      }

      console.log('Authentication successful'); // log successful path
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const authHeader = request.headers.authorization;
      console.log('Authorization header:', authHeader); // log the uath header

      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      const result = type === 'Bearer' ? token : undefined;

      console.log('Token extraction result:', result); //log extraction result
      return result;
    }
  }
  