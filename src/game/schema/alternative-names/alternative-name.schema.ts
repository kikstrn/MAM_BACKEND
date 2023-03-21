import { Exclude, Expose, Type } from "class-transformer";
import { IsIn, IsInt, IsString } from "class-validator";

@Exclude()
export class AlternativeName {
    @Expose()
    @IsInt()
    @Type(() => Number)
    id:number;

    @Expose()
    @IsString()
    checksum:string;

    @Expose()
    @IsString()
    comment:string;

    @Expose()
    @IsString()
    name:string;
}
