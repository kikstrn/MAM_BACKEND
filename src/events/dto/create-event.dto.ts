import { Transform, Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";
import { User } from "../../users/schema/users.schema";
import { Game } from "../../game/schema/game.schema";

export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(100)
    max_nb_player: number;

    @IsNotEmpty()
    @IsDate()
    start_event: Date;

    @IsNotEmpty()
    @IsDate()
    end_event: Date;

    @IsNotEmpty()
    @Type(() => User)
    @Transform(({value}) => value._id)
    master: string;

    @IsNotEmpty()
    @Type(() => Game)
    @Transform(({value}) => value._id)
    game: string;
}
