import { Exclude, Expose } from "class-transformer";

@Exclude()
export class IgdbPlatforms {
    id: number;
    category: number;
    created_at: Date;
    generation: number;
    platform_family: number;
    slug: string;
    updated_at: Date;
    url: string;
    platform_logo: number;
    checksum: string;

    @Expose()
    name: string;

    @Expose()
    abbreviation: string;
}