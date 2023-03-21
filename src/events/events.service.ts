import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './schema/event.schema';
import { Model } from "mongoose";
import { User } from '../users/schema/users.schema';
import { UpdateEventDto } from './dto/update-event.dto';
import { UsersService } from '../users/users.service';
import { UserToken } from '../auth/dto/user-token.dto';
import { plainToInstance } from 'class-transformer';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    private readonly userService: UsersService
  ){}

  async findAll():Promise<Event[]> {
    const events = await this.eventModel.find().exec().catch((e) => { throw new BadRequestException() });
    return plainToInstance(Event, events);
  }

  async findById(id: string):Promise<Event> {
    const event = await this.eventModel.findById(id).populate('master',null).populate('players',null).populate('game',null).orFail().exec().catch((e) => { throw new NotFoundException() });
    return plainToInstance(Event, event);
  }

  async findByIdLocal(id: string):Promise<Event> {
    const event = await this.eventModel.findById(id).orFail().exec().catch((e) => { throw new NotFoundException() });
    return event;
  }

  async findByIdGame(id: string):Promise<Event[]> {
    const events = await this.eventModel.find({ game: id }).populate('master',null).populate('players',null).exec().catch((e) => { throw new BadRequestException() });
    return plainToInstance(Event, events);
  }

  async findByIdUser(id: string):Promise<Event[]> {
    const events = await this.eventModel.find({ master: id }).populate('master',null).populate('players',null).populate('game',null).exec().catch((e) => { throw new BadRequestException() });
    return plainToInstance(Event, events);
  }

  async participate(id: string, userToken: UserToken): Promise<void> {
    const userRequest = await this.userService.findByIdLocal(userToken._id);
    if(!userRequest.isActive) throw new UnauthorizedException()

    const event = await this.findByIdLocal(id);

    if(event.end_event < new Date()) throw new BadRequestException('Event is over');
    if(event.players.length >= event.max_nb_player) throw new BadRequestException('The event is full');
    if(event.master._id.toHexString() === userRequest._id.toHexString()) throw new BadRequestException('You can not participate to your own event');
    if(event.players.filter( player => player._id.toString() === userRequest._id.toHexString()).length > 0){
      throw new BadRequestException('You are already participating');
    }    
    await this.eventModel.findOneAndUpdate(event._id, { $push: { players: { _id: userRequest._id } } }).lean().exec().catch((e) => { throw new BadRequestException() });
  }

  async unParticipate(id: string, userToken: UserToken): Promise<void> {
    const userRequest = await this.userService.findByIdLocal(userToken._id);
    if(!userRequest.isActive) throw new UnauthorizedException()

    const event = await this.findByIdLocal(id);

    if(event.end_event < new Date()) throw new BadRequestException('Event is over');
    await this.eventModel.findOneAndUpdate(event._id, { $pullAll: { players: [{ _id: userRequest._id }] } }).lean().exec().catch((e) => { throw new BadRequestException() });
  }

  async create(createEventDto: CreateEventDto, userToken: UserToken):Promise<Event> {
    const userRequest: User = await this.userService.findByIdLocal(userToken._id);
    if(userRequest._id.toHexString() != createEventDto.master) throw new UnauthorizedException();
    const event = new this.eventModel(createEventDto);
    await event.save();
    await event.populate('master');
    await event.populate('players');
    await event.populate('game');
    return plainToInstance(Event, event);
  }

  async update(updateEventDto: UpdateEventDto, userToken: UserToken):Promise<void> {
    const eventToUpdate = await this.eventModel.findById(updateEventDto._id).orFail().lean().exec().catch((e) => { throw new NotFoundException() });
    const userRequest: User = await this.userService.findByIdLocal(userToken._id);

    if(userRequest.isAdmin || userRequest._id.toHexString() === eventToUpdate.master._id.toHexString()){
      await this.eventModel.findByIdAndUpdate(updateEventDto._id, updateEventDto, { lean: true }).orFail().exec().catch((e) => { throw new NotFoundException() });
    }else{
      throw new UnauthorizedException()
    }
  }

  async remove(id: string, userToken: UserToken):Promise<void> {
    const eventToUpdate = await this.eventModel.findById(id).orFail().exec().catch((e) => { throw new NotFoundException() });
    const userRequest: User = await this.userService.findByIdLocal(userToken._id);

    if(userRequest.isAdmin || userRequest._id.toHexString() === eventToUpdate.master._id.toHexString()){
      await this.eventModel.findByIdAndDelete(id).orFail().exec().catch((e) => { throw new NotFoundException() });
    }else{
      throw new UnauthorizedException()
    }
  }
}
