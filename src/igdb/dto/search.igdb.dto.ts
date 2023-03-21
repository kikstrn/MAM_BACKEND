import { IsString } from "class-validator";

export class SearchIgdbDto {
    @IsString()
    game:string;
}