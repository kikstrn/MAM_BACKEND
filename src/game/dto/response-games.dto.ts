import { Exclude, Expose, Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";
import { Game } from "../schema/game.schema";

@Exclude()
export class ResponseGame{
    @Expose()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(()=> Game)
    data:Game[];

    @Expose()
    @IsString()
    next_route:string;
}