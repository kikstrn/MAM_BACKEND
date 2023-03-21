import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schema/users.schema';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { ResponseLoginDto } from './dto/response-login';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto):Promise<ResponseLoginDto> {
    const user = await this.validateUser(authLoginDto);

    return {
      access_token: this.jwtService.sign({_id: user._id, isAdmin: user.isAdmin}),
      expires_in:Number(process.env.EXPIRE_TOKEN)
    }
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { username, password } = authLoginDto;
    return this.usersService.findByUsername(username).then(async (utilisateur)=>{
      if(!utilisateur) throw new UnauthorizedException();
      if(!await this.validatePassword(password, utilisateur.password)) throw new UnauthorizedException();
      return utilisateur;
    });
  }

  async validatePassword(password: string, passwordToCheck: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordToCheck);
  }
}
