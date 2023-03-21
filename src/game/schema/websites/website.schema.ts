import { Exclude, Expose, Type } from "class-transformer";
import { IsBoolean, IsEnum, IsInt, IsString } from "class-validator";
import { category } from "./enum/category.enum";

@Exclude()
export class Website {
    @Expose()
    @IsInt()
    @Type(() => Number)
    id:number;

    @Expose()
    @IsEnum(category)
    category:category;

    @Expose()
    @IsString()
    checksum:string;

    @Expose()
    @IsBoolean()
    trusted:boolean;

    @Expose()
    @IsString()
    url:string;
}