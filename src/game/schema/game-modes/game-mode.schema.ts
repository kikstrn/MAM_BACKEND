import { Exclude, Expose, Type } from "class-transformer";
import { IsInt, IsString } from "class-validator";

@Exclude()
export class GameMode {
    @Expose()
    @IsInt()
    @Type(() => Number)
    id:number;

    @Expose()
    @IsString()
    checksum:string;

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
