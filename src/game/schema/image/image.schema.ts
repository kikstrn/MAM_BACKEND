import { Exclude, Expose, Type } from "class-transformer";
import { IsBoolean, IsInt, IsNumber, IsString } from "class-validator";

@Exclude()
export class Image {
    @Expose()
    @IsInt()
    @Type(() => Number) 
    id:number;

    @Expose()
    @IsBoolean()
    alpha_channel:boolean;

    @Expose()
    @IsBoolean()
    animated:boolean;
    
    @Expose()
    @IsString()
    checksum:string;
    
    @Expose()
    @IsNumber()
    height:number;

    @Expose()
    @IsNumber()
    width:number;

    @Expose()
    @IsString()
    image_id:string;

    @Expose()
    @IsString()
    url:string;
}