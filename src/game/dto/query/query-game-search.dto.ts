import { IsNotEmpty, IsString } from "class-validator";

export class QueryGameSearchDto{
    @IsNotEmpty()
    @IsString()
    game:string;
}