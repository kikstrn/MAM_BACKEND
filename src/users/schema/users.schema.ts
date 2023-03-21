import { Exclude, Expose, Transform, Type } from "class-transformer";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { environement } from "../../environements/environement.dev";
import { ExposeId } from "../../core/custom-validator";
import { IsBoolean, IsString } from "class-validator";
import { InternalServerErrorException } from "@nestjs/common";
import { Game } from "../../game/schema/game.schema";

@Exclude()
export class Friend {
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
export class UserGameCover {
    @Expose()
    @IsString()
    image_id:string;
}

@Exclude()
export class UserGame {
  @Expose()
  @ExposeId()
  @Transform(({value}) => value.toString() , { toClassOnly: true })
  _id: ObjectId;

  @Expose()
  @IsString()
  name:string;

  @Expose()
  @Type(() => UserGameCover)
  cover: UserGameCover;
}

export type UsersDocument = User & Document;
@Exclude()
@Schema( { timestamps: true } )
export class User {
  @Expose()
  @ExposeId()
  @Transform(({value}) => value.toString() , { toClassOnly: true })
  _id: ObjectId;

  @Expose()
  @IsString()
  @Prop({ type: String, unique: true, required: true })
  username: string;
  
  @IsString()
  @Prop()
  password: string;

  @Expose()
  @IsString()
  @Prop({ default: environement.AVATAR })
  avatar: string;

  @Expose()
  @Type(() => UserGame)
  @Prop({ type: [{ type: ObjectId, ref: 'Game' }], default: [] })
  games: Game[];

  @Expose()
  @Type(() => Friend)
  @Prop({ type: [{ type: ObjectId, ref: 'User' }], default: [] })
  friends: User[];

  @Expose()
  @IsBoolean()
  @Prop({ default: false })
  isAdmin: boolean;

  @Expose()
  @IsBoolean()
  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}
export const UsersSchema = SchemaFactory.createForClass(User);

UsersSchema.pre('save', async function(next) {
  if(this.password){
    this.password = await hashePassword(this.password).catch(e => { throw new InternalServerErrorException(e) })
  }
  next();
});

UsersSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate() as any;
  if(update.password){
    update.password = await hashePassword(update.password).catch(e => { throw new InternalServerErrorException(e) })
  }
  next();
})

const hashePassword = (password: string): Promise<string> => {
  try {
    return bcrypt.hash(password, 10);
  } catch (e) {
    Promise.reject('there are some issiue in the hash')
  }
} 
