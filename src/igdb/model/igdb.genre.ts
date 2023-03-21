import { Exclude, Expose } from "class-transformer";

@Exclude()
export class IgdbGenre {
    id: number;
    created_at: Date;
    updated_at: Date;
    checksum: string;
    url: string;

    @Expose()
    name: string;

    @Expose()
    slug: string;
}