import { IsNumber, IsOptional, IsString } from "class-validator";

export class QueryLimitOffset {
    @IsOptional()
    @IsNumber()
    limit:number = 10;

    @IsOptional()
    @IsNumber()
    offset:number = 0;
}

export class QueryIgdbDto extends QueryLimitOffset{ 
    @IsString()
    game:string;
}