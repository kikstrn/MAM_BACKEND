import { Transform, Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Game } from "../../game/schema/game.schema";
import { User } from "../../users/schema/users.schema";

export class CreateReviewDto {
    @IsNotEmpty()
    @IsString()
    title:string;

    @IsNotEmpty()
    @IsString()
    review:string;

    @IsOptional()
    @IsString()
    good_point:string;

    @IsOptional()
    @IsString()
    bad_point:string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(10)
    rating:number;

    @IsNotEmpty()
    @Type(() => User)
    @Transform(({value}) => value._id)
    author: string;

    @IsNotEmpty()
    @Type(() => Game)
    @Transform(({value}) => value._id)
    game: string;
}
