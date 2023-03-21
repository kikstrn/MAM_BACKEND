import { IsNotEmpty,IsNumber, IsString } from 'class-validator';
import { env } from 'process';

export class ResponseLoginDto {
  @IsNotEmpty()
  @IsString()
  access_token: string;

  @IsNotEmpty()
  @IsNumber()
  expires_in:number = Number(env.EXPIRE_TOKEN);
}