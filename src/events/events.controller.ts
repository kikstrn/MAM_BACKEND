import { Controller, Get, Post, Body, Param, Delete, Put, BadRequestException, HttpCode, Patch, UnauthorizedException } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Public } from '../auth/decorators/public.decorator';
import { UserReq } from '../auth/decorators/user.decorator';
import { ParseObjectIdPipe } from '../decorators/decorator';
import { UpdateEventDto } from './dto/update-event.dto';
import { UserToken } from '../auth/dto/user-token.dto';
import { Event } from './schema/event.schema';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Public()
  @HttpCode(200)
  @Get()
  async findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Public()
  @HttpCode(200)
  @Get(':id')
  async findById(@Param('id', ParseObjectIdPipe) id: string): Promise<Event> {
    return this.eventsService.findById(id);
  }

  @Public()
  @HttpCode(200)
  @Get('/game/:id')
  async findByIdGame(@Param('id', ParseObjectIdPipe) id: string):Promise<Event[]> {
    return this.eventsService.findByIdGame(id);
  }

  @Public()
  @HttpCode(200)
  @Get('/user/:id')
  async findByIdUser(@Param('id', ParseObjectIdPipe) id: string):Promise<Event[]> {
    return this.eventsService.findByIdUser(id);
  }

  @HttpCode(204)
  @Get('participate/:id')
  async participate(@Param('id', ParseObjectIdPipe) id: string, @UserReq() user: UserToken): Promise<void> {
    return this.eventsService.participate(id, user);
  }
  
  @HttpCode(204)
  @Get('un-participate/:id')
  async unParticipate(@Param('id', ParseObjectIdPipe) id: string, @UserReq() user: UserToken): Promise<void> {
    return this.eventsService.unParticipate(id, user);
  }

  @HttpCode(201)
  @Post()
  async create(@Body() createEventDto: CreateEventDto, @UserReq() userToken: UserToken): Promise<Event> {
    return this.eventsService.create(createEventDto, userToken);
  }

  @HttpCode(204)
  @Patch()
  async update(@Body() updateEventDto: UpdateEventDto, @UserReq() userToken: UserToken): Promise<void> {
    return this.eventsService.update(updateEventDto, userToken);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: string, @UserReq() userToken: UserToken): Promise<void> {
    return this.eventsService.remove(id, userToken);
  }
}
