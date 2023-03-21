import { Exclude, Expose } from "class-transformer";

@Exclude()
export class IgdbScreenshot {
    id: number;
    game: number;
    url: string;
    checksum: string;

    @Expose()
    height: number;

    @Expose()
    image_id: string;
    
    @Expose()
    width: number;
}