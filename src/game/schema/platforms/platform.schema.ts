import { Exclude, Expose, Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNumber, IsString } from "class-validator";
import { PlatformLogo } from "../platform-logo/platform-logo.schema";
import { ReleaseDate } from "../release-dates/release-date.schema";
import { category } from "./enum/category.enum";
@Exclude()
export class Platform {
    @Expose()
    @IsInt()
    @Type(() => Number)
    id:number;

    @Expose()
    @IsString()
    abbreviation:string;

    @Expose()
    @IsString()
    alternative_name:string;

    @Expose()
    @IsEnum(category)
    category:category;

    @Expose()
    @IsString()
    checksum:string;

    @Expose()
    @IsNumber()
    generation:number;

    @Expose()
    @IsString()
    name:string;

    @Expose()
    @Type(() => PlatformLogo)
    platform_logo:PlatformLogo;

    @Expose()
    @IsString()
    slug:string;

    @Expose()
    @IsString()
    summary:string;

    @Expose()
    @IsString()
    url:string;

    @Expose()
    @IsArray()
    @Type(() => ReleaseDate)
    release_dates: ReleaseDate[];
}
