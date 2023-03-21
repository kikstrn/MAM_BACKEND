import { IsNumber, IsOptional } from "class-validator";

export class IgdbQueryDto {
    @IsOptional()
    @IsNumber()
    limit:number = 10;

    @IsOptional()
    @IsNumber()
    offset:number = 0;
}