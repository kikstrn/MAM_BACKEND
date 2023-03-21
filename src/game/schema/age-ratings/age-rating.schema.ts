import { Exclude, Expose, Type } from "class-transformer";
import { IsEnum, IsInt, IsString } from "class-validator";
import { category } from "./enum/category.enum";
import { rating } from "./enum/rating.enum";

@Exclude()
export class AgeRating {
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
    @IsEnum(rating)
    rating:rating;

    @Expose()
    @IsString()
    rating_cover_url:string;

    @Expose()
    @IsString()
    synopsis:string;
}