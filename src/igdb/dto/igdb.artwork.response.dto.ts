import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";
import { IgdbArtworkResponse } from "../model/igdb.artwork.response";

export class IgdbArtworkResponseDto {    
    @IsArray()
    @Type(()=>IgdbArtworkResponse)
    data:IgdbArtworkResponse[];

    @IsOptional()
    @IsString()
    nextRoute:string;
}