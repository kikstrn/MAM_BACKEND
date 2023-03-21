import { Exclude, Expose, Type } from "class-transformer";

class Game{
    id:number;
    name:string;
}

@Exclude()
export class IgdbArtworkResponse {
    id: number;
    alpha_channel: boolean;
    url: string;
    checksum: string;

    @Expose()
    animated: boolean;

    @Expose()
    @Type(()=>Game)
    game:Game;

    @Expose()
    height: number;

    @Expose()
    image_id: string;

    @Expose()
    width: number;
}