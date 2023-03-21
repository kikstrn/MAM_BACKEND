import { Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsNumber, IsString } from "class-validator";
import { category } from "./enum/category.enum";
import { region } from "./enum/region.enum";
export class ReleaseDate {
    @IsInt()
    @Type(() => Number)
    id:number;

    @IsEnum(category)
    category:category;

    @IsString()
    checksum:string;

    @IsDate()
    date:Date;

    @IsString()
    human:string;

    @IsNumber()
    m:number;

    @IsEnum(region)
    region:region;
    
    @IsNumber()
    y:number;
}
