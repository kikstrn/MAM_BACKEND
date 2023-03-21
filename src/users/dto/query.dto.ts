import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class QueryDto {
    @IsNotEmpty()
    @IsBoolean()
    @Transform((value)=> ['true', 'on', 'yes', '1'].includes(value.obj[value.key].toLowerCase()) ? true : false)
    status: boolean;
}