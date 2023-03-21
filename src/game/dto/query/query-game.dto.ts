import { Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, Max, Min } from "class-validator";

export class QueryGameDto {
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(150)
    @Type(() => Number)
    limit = 10;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    offset = 0
}