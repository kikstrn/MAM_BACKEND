import { Exclude, Expose } from "class-transformer";

@Exclude()
export class IgdbArtwork {
    id: number;
    alpha_channel: boolean;
    game: number;
    url: string;
    checksum: string;

    @Expose()
    animated: boolean;

    @Expose()
    height: number;

    @Expose()
    image_id: string;

    @Expose()
    width: number;
}