import { Body, Controller, Get, Post, UnauthorizedException, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthLoginDto } from './dto/auth-login.dto';
import { ResponseLoginDto } from './dto/response-login';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Public()
  async login(@Body() authLoginDto: AuthLoginDto):Promise<ResponseLoginDto> {
    return this.authService.login(authLoginDto).catch((err) => {
      throw new UnauthorizedException();
    });
  }

  @Get()
  async test() {
    return 'Success!';
  }
}
