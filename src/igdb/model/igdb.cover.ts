import { Exclude, Expose } from "class-transformer";

@Exclude()
export class IgdbCover {
    id:number;
    animated: boolean;
    game: number;
    url: string;
    
    @Expose()
    height: number;

    @Expose()
    image_id: string;
    
    @Expose()
    width: number;
}