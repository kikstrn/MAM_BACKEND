import { Body, Controller, Delete, Get, HttpCode, Param, ParseArrayPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { UserReq } from '../auth/decorators/user.decorator';
import { ParseObjectIdPipe } from '../decorators/decorator';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersService } from './users.service';
import { UserToken } from '../auth/dto/user-token.dto';
import { QueryDto } from './dto/query.dto';
import { User, Friend } from './schema/users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @HttpCode(200)
  @Get()
  async findAll():Promise<User[]> {
    return this.usersService.findAll();
  }

  @Public()
  @HttpCode(200)
  @Get('/info/:id')
  async findById(@Param('id', ParseObjectIdPipe) id: string):Promise<User> {
    return this.usersService.findById(id);
  }

  @HttpCode(200)
  @Get('/manage/:id')
  async manageOne(@Param('id', ParseObjectIdPipe) id: string, @Query() query: QueryDto, @UserReq() userToken: UserToken):Promise<void> {
    return this.usersService.manageOne(id, query, userToken);
  }

  @Public()
  @HttpCode(200)
  @Get('/pending-friends/:id')
  async findFriendsWaiting(@Param('id', ParseObjectIdPipe) id: string):Promise<Friend[]> {
    return this.usersService.findFriendsWaiting(id);
  }

  @Public()
  @HttpCode(200)
  @Get('/multi')
  async findByIds(@Query('ids', new ParseArrayPipe({ items: String, separator: ',' })) ids: string[]):Promise<User[]> {
    return this.usersService.findByIds(ids);
  }

  
  @Public()
  @HttpCode(201)
  @Post()
  async create(@Body() createUsersDto: CreateUsersDto):Promise<User> {
    return this.usersService.create(createUsersDto);
  }

  @HttpCode(204)
  @Patch()
  async update(@Body() updateUserDto: UpdateUsersDto, @UserReq() userToken: UserToken):Promise<void> {
    return this.usersService.update(updateUserDto, userToken);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: string, @UserReq() userToken: UserToken):Promise<void> {
    return this.usersService.remove(id, userToken);
  }
}