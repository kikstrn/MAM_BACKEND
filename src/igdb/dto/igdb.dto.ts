import { Transform, Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { IgdbArtwork } from "../model/igdb.artwork";
import { IgdbCover } from "../model/igdb.cover";
import { IgdbGenre } from "../model/igdb.genre";
import { IgdbPlatforms } from "../model/igdb.platform";
import { IgdbScreenshot } from "../model/igdb.screenshot";

export class Igdb {
    @IsNumber()
    id: number;

    @IsOptional()
    @Type(()=>IgdbCover)
    cover: IgdbCover;

    @IsOptional()
    @Type(()=>IgdbArtwork)
    artworks: IgdbArtwork[];

    @IsString()
    name: string;    

    @IsOptional()
    @Type(()=>IgdbPlatforms)
    platforms: IgdbPlatforms[];

    @IsOptional()
    @Type(()=>IgdbScreenshot)
    screenshots: IgdbScreenshot[];

    @IsNumber()
    @Transform((value)=>{Math.round(Number(value))})
    total_rating: number;

    @IsNumber()
    @Transform((value)=>{Math.round(Number(value))})
    total_rating_count: number;

    @IsOptional()
    @Type(()=>IgdbGenre)
    genres: IgdbGenre[];

    // alternative_names: string;
    // url: string;
    // age_ratings: number[];
    // alternative_name: string;
    // category: number;
    // created_at: Date;
    // updated_at: Date;
    // platform_logo: number;
    // versions: number[];
    // websites: number[];
    // checksum: string;
    // age_ratings: number[];
    // aggregated_rating: number;
    // aggregated_rating_count: number;
    // alternative_names: number[];
    // collection: number;
    // external_games: number[];
    // first_release_date: number;
    // follows: number;
    // franchise: number;
    // franchises: number[];
    // game_engines: number[];
    // game_modes: number[];
    // genres: number[];
    // involved_companies: number[];
    // keywords: number[];
    // multiplayer_modes: number[];
    // player_perspectives: number[];
    // release_dates: number[];
    // similar_games: number[];
    // tags: number[];
    // themes: number[];
    // videos: number[];
    // remakes: number[];
    // bundles: number[];
    // hypes?: number;
    // parent_game?: number;
    // version_parent?: number;
    // version_title: string;
    // dlcs: number[];
}