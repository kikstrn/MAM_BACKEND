import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsString } from "class-validator";

export class PlatformLogo {
    @IsInt()
    @Type(() => Number)
    id:number;

    @IsBoolean()
    alpha_channel:boolean;
    
    @IsBoolean()
    animated:boolean;

    @IsString()
    checksum:string;

    @IsInt()
    @Type(() => Number)
    height:number;

    @IsInt()
    @Type(() => Number)
    width:number;

    @IsString()
    image_id:string;

    @IsString()
    url:string;
}
