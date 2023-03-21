import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Game } from "../../game/schema/game.schema";
import { User } from "../schema/users.schema";

export class CreateUsersDto {
    @IsNotEmpty()
    @IsString()
    username : string;

    @IsNotEmpty()
    @IsString()
    password : string;

    @IsOptional()
    @IsString()
    avatar : string;

    @IsOptional()
    @IsArray()
    @Type(() => Game)
    games : Game[];

    @IsOptional()
    @IsArray()
    @Type(() => User)
    friends:User[];
}