import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    return this.usersService.getProfile(req.user.id);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
