import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose, Transform, Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';
import { ExposeId } from '../../core/custom-validator';
import { Game } from '../../game/schema/game.schema';
import { User } from '../../users/schema/users.schema';

export type ReviewDocument = Review & Document;

@Exclude()
export class Author {
  @Expose()
  @ExposeId()
  @Transform(({value}) => value.toString() , { toClassOnly: true })
  _id: ObjectId;

    @Expose()
    @IsString()
    username : string;

    @Expose()
    @IsString()
    avatar: string;
}

@Exclude()
export class ReviewGame {
  @Expose()
  @ExposeId()
  @Transform(({value}) => value.toString() , { toClassOnly: true })
  _id: ObjectId;

  @Expose()
  @IsString()
  name:string;
}

@Exclude()
@Schema( { timestamps: true } )
export class Review {
  @Expose()
  @ExposeId()
  @Transform(({value}) => value.toString() , { toClassOnly: true })
  _id: ObjectId;

  @Expose()
  @IsString()
  @Prop()
  title:string;

  @Expose()
  @IsString()
  @Prop()
  review:string;

  @Expose()
  @IsString()
  @Prop()
  good_point:string;

  @Expose()
  @IsString()
  @Prop()
  bad_point:string;

  @Expose()
  @IsNumber()
  @Prop()
  rating:number;

  @Expose()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Type(() => Author)
  author: User;

  @Expose()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Game' })
  @Type(() => ReviewGame)
  game: Game;

  @Expose()
  @IsDate()
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}
export const ReviewSchema = SchemaFactory.createForClass(Review);