import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";
import { Types, Schema as MongooseSchema } from 'mongoose';
import { Game } from "../../game/schema/game.schema";
import { User } from "../../users/schema/users.schema";
import { ObjectId } from 'mongodb';
import { ExposeId } from "../../core/custom-validator";

@Exclude()
export class EventPlayer {
    @Expose()
    @ExposeId()
    @Transform(({value}) => value.toString() , { toClassOnly: true })
    _id: ObjectId;

    @Expose()
    @IsString()
    username : string;
}

@Exclude()
export class EventMaster {
    @Expose()
    @ExposeId()
    @Transform(({value}) => value.toString() , { toClassOnly: true })
    _id: ObjectId;

    @Expose()
    @IsString()
    username : string;

    @Expose()
    @IsString()
    avatar : string;
}

@Exclude()
export class EventGame {
    @Expose()
    @ExposeId()
    @Transform(({value}) => value.toString() , { toClassOnly: true })
    _id: ObjectId;

  @Expose()
  @IsString()
  name:string;
}

export type EventDocument = Event & Document;
@Exclude()
@Schema( { timestamps: true } )
export class Event {
    @Expose()
    @ExposeId()
    @Transform(({value}) => value.toString() , { toClassOnly: true })
    _id: ObjectId;

    @Expose()
    @IsString()
    @Prop()
    title: string;

    @Expose()
    @IsString()
    @Prop()
    description: string;

    @Expose()
    @IsNumber()
    @Prop()
    max_nb_player: number;

    @Expose()
    @IsDate()
    @Prop()
    start_event: Date;

    @Expose()
    @IsDate()
    @Prop()
    end_event: Date;

    @Expose()
    @Type(() => EventMaster)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    master: User;

    @Expose()
    @Type(() => EventPlayer)
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
    players: User[];

    @Expose()
    @Type(() => EventGame)
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Game' })
    game: Game;

    @IsDate()
    createdAt: Date;
    @IsDate()
    updatedAt: Date;
}
export const EventSchema = SchemaFactory.createForClass(Event);