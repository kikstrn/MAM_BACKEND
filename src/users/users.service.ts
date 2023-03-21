import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUsersDto } from "./dto/create-users.dto";
import { User, UsersDocument, Friend } from "./schema/users.schema";
import { UpdateUsersDto } from "./dto/update-users.dto";
import { UserToken } from "../auth/dto/user-token.dto";
import { QueryDto } from "./dto/query.dto";
import { plainToInstance } from "class-transformer";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { DuplicateMongoException } from "../core/duplicate-mongo.exception";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UsersDocument>){}

  async findAll():Promise<User[]> {
    const users:User[] = await this.userModel.find().catch((e) => { throw new BadRequestException() });
    return plainToInstance(User, users);
  }

  async findById(id: string):Promise<User> {
    const user = await this.userModel.findById(id).populate('friends',[]).populate('games',[]).orFail().exec().catch((e) => { console.log(e); throw new NotFoundException() });
    return plainToInstance(User, user);
  }

  async findByIdLocal(id: string):Promise<User> {
    const user = await this.userModel.findById(id).orFail().exec().catch((e) => { throw new NotFoundException() });
    return user;
  }

  async manageOne(id: string, query: QueryDto, userToken: UserToken):Promise<void> {

    const userRequest: User = await this.findByIdLocal(userToken._id);
    const userToUpdate: User = await this.findByIdLocal(id);

    if(!userRequest.isAdmin) throw new UnauthorizedException();
    userToUpdate.isActive = query.status
    await this.userModel.findOneAndUpdate({ _id: userToUpdate._id }, userToUpdate, { lean: true }).orFail().exec().catch((e) => { throw new NotFoundException() });
  }

  async findByIds(ids: string[]):Promise<User[]> {
    const users:User[] = await this.userModel.find({ _id: { $in: ids } }).orFail().exec().catch((e) => { throw new BadRequestException() });
    return plainToInstance(User, users);
  }

  async findFriendsWaiting(id: string):Promise<Friend[]> {
    let friendsPending: Friend[] = [];
    const user: User = await this.findByIdLocal(id);
    let users: User[] = await this.userModel.find({ friends: id }).populate('friends',[]).orFail().exec().catch((e) => { throw new BadRequestException() });
    for(let i = 0; i < users.length; i++){
      if(!user.friends.find(friend => friend._id.toHexString() === users[i]._id.toHexString())){
        friendsPending.push(users[i]);
      }
    }
    return plainToInstance(Friend, friendsPending);
  }

  async findByUsername(username: string):Promise<User | undefined> {
    const user = await this.userModel.findOne({ username: username, isActive: true }).orFail().exec().catch((e) => { return undefined });
    return user;
  }

  async create(createUserDto: CreateUsersDto):Promise<User> {
    const user = new this.userModel(createUserDto);
    const createdUser = await user.save().catch((e) => { throw new DuplicateMongoException() });
    return plainToInstance(User, createdUser);
  }

  async update(updateUserDto: UpdateUsersDto, userToken: UserToken):Promise<void> {
    const userToUpdate: User = await this.findByIdLocal(updateUserDto._id);
    const userRequest: User = await this.findByIdLocal(userToken._id);

    if(userRequest.isAdmin || userRequest._id.toHexString() === userToUpdate._id.toHexString()){
      if((updateUserDto.isAdmin === true && !userRequest.isAdmin)) {
        updateUserDto.isAdmin = false;
      }      
      await this.userModel.findByIdAndUpdate(updateUserDto._id, updateUserDto, { lean: true }).orFail().exec().catch((e) => { throw new NotFoundException() });
    }else{
      throw new UnauthorizedException()
    }
  }

  async remove(id: string, userToken: UserToken):Promise<void> {
    const userToDelete = await this.findByIdLocal(id);
    const userRequest = await this.findByIdLocal(userToken._id);

    if(userRequest.isAdmin || userRequest._id.toHexString() === userToDelete._id.toHexString()){
      await this.userModel.findByIdAndDelete(id).orFail().exec().catch((e) => { throw new NotFoundException() });
    }else{
      throw new UnauthorizedException()
    }
  }
}