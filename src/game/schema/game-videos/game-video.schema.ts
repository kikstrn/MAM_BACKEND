import { Exclude, Expose, Type } from "class-transformer";
import { IsInt, IsString } from "class-validator";

@Exclude()
export class GameVideo {
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
    video_id:string;
}
