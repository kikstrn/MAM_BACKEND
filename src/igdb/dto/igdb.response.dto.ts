import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";
import { Igdb } from "./igdb.dto";
export class IgdbResponseDto {    
    @IsArray()
    @Type(()=>Igdb)
    data:Igdb[];

    @IsOptional()
    @IsString()
    nextRoute:string;
}