import { Exclude, Expose, Type } from "class-transformer";
import { IsInt, IsString } from "class-validator";

@Exclude()
export class Theme {
    @Expose()
    @IsInt()
    @Type(() => Number)
    id:number;

    @Expose()
    @IsString()
    name:string;

    @Expose()
    @IsString()
    slug:string;

    @Expose()
    @IsString()
    url:string;
}