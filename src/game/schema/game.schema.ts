import { GameMode } from "./game-modes/game-mode.schema";
import { status } from "../enum/status.enum";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from 'mongodb';
import { IsDate, IsEnum, IsInt, IsNumber, IsString, ValidateNested } from "class-validator";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import { AlternativeName } from "./alternative-names/alternative-name.schema";
import { Genre } from "./genres/genre.schema";
import { Platform } from "./platforms/platform.schema";
import { Theme } from "./themes/theme.schema";
import { GameVideo } from "./game-videos/game-video.schema";
import { Website } from "./websites/website.schema";
import { Image } from "./image/image.schema";
import { AgeRating } from "./age-ratings/age-rating.schema";
import { ExposeId } from "../../core/custom-validator";

export type GameDocument = Game & Document;
@Exclude()
@Schema( { timestamps: true } )
export class Game {
  @Expose()
  @ExposeId()
  @Transform(({value}) => value.toString() , { toClassOnly: true })
  _id: ObjectId;

  @Expose()
  @Prop()
  @IsInt()
  @Type(() => Number)
  id:number;

  @Expose()
  @Prop()
  @Type(() => Image)
  @ValidateNested()
  cover: Image;

  @Expose()
  @Prop()
  @ValidateNested({ each: true })
  @Type(() => AgeRating)
  age_ratings:AgeRating[];

  @Expose()
  @Prop()
  @IsNumber()
  aggregated_rating:number;

  @Expose()
  @Prop()
  @IsNumber()
  aggregated_rating_count:number;

  @Expose()
  @Prop()
  @Type(() => AlternativeName)
  @ValidateNested({ each: true })
  alternative_names:AlternativeName[];

  @Expose()
  @Prop()
  @ValidateNested({ each: true })
  @Type(() => Image)
  artworks: Image[];

  @Expose()
  @Prop()
  @IsString()
  checksum:string;

  @Expose()
  @Prop()
  @IsDate()
  first_release_date:Date;

  @Expose()
  @Prop()
  @IsNumber()
  follows:number;  
  
  @Expose()
  @Prop()
  @ValidateNested({ each: true })
  @Type(() => GameMode)
  game_modes:GameMode[];

  @Expose()
  @Prop()
  @ValidateNested({ each: true })
  @Type(() => Genre)
  genres:Genre[];

  @Expose()
  @Prop()
  @IsNumber()
  hypes:number;

  @Expose()
  @Prop()
  @IsString()
  name:string;

  @Expose()
  @Prop()
  @ValidateNested({ each: true })
  @Type(() => Platform)
  platforms:Platform[];

  @Expose()
  @Prop()
  @IsNumber()
  rating:number;

  @Expose()
  @Prop()
  @IsNumber()
  rating_count:number;

  @Expose()
  @Prop()
  @Type(() => Image)
  @ValidateNested({ each: true })
  screenshots: Image[];

  @Expose()
  @Prop()
  @IsString()
  slug:string;

  @Expose()
  @Prop()
  @IsEnum(status)
  status:status;

  @Expose()
  @Prop()
  @IsString()
  storyline:string;

  @Expose()
  @Prop()
  @IsString()
  summary:string;

  @Expose()
  @Prop()
  @IsString()
  summary_trad_fr:string;

  @Expose()
  @Prop()
  @Type(() => Theme)
  @ValidateNested({ each: true })
  themes:Theme[];

  @Expose()
  @Prop()
  @IsNumber()
  total_rating:number;

  @Expose()
  @Prop()
  @IsNumber()
  total_rating_count:number;

  @Expose()
  @Prop()
  @IsString()
  url:string;

  @Expose()
  @Prop()
  @IsString()
  version_title:string;

  @Expose()
  @Prop()
  @Type(() => GameVideo)
  @ValidateNested({ each: true })
  videos:GameVideo[];

  @Expose()
  @Prop()
  @Type(() => Website)
  @ValidateNested({ each: true })
  websites:Website[];

  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
}
export const GameSchema = SchemaFactory.createForClass(Game);