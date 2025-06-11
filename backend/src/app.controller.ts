import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): object {
    return {
      message: 'NestJS Authentication API is running!',
      version: '1.0.0',
      endpoints: {
        auth: {
          signup: 'POST /auth/signup',
          signin: 'POST /auth/signin',
          logout: 'POST /auth/logout (protected)',
        },
        users: {
          profile: 'GET /users/profile (protected)',
          all: 'GET /users (protected)',
        },
      },
    };
  }

  @Get('health')
  getHealth(): object {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      server: 'NestJS Authentication API',
      cors: 'enabled',
      port: process.env.PORT || 3000,
    };
  }
}
