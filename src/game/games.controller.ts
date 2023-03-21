import { Controller, Get, HttpCode, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { GamesService } from './games.service';
import { QueryGameDto } from './dto/query/query-game.dto';
import { QueryGameSearchDto } from './dto/query/query-game-search.dto';
import { Public } from '../auth/decorators/public.decorator';
import { ParseObjectIdPipe } from '../decorators/decorator';
import { ResponseGame } from './dto/response-games.dto';
import { Game } from './schema/game.schema';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Public()
  @HttpCode(200)
  @Get()
  async findAll(@Query() queryGameDto: QueryGameDto):Promise<ResponseGame> {
    return this.gamesService.findAll(queryGameDto);
  }

  @Public()
  @HttpCode(200)
  @Get('artworks')
  async findGameArtwork(@Query() queryGameDto: QueryGameDto):Promise<ResponseGame> {
    return this.gamesService.findGameArtwork(queryGameDto);
  }

  @Public()
  @HttpCode(200)
  @Get('artworks/count')
  async countGameWithArtwork():Promise<number> {
    return this.gamesService.countGameWithArtwork();
  }

  @Public()
  @HttpCode(200)
  @Get('info/:id')
  async findById(@Param('id', ParseObjectIdPipe) id: string):Promise<Game> {
    return this.gamesService.findById(id);
  }

  @Public()
  @HttpCode(200)
  @Get('popular-games')
  async findPopularGame(@Query() queryGameDto: QueryGameDto):Promise<ResponseGame> {
    return this.gamesService.findPopularGame(queryGameDto);
  }

  @Public()
  @HttpCode(200)
  @Get('next-release')
  async findNextRelease(@Query() queryGameDto: QueryGameDto):Promise<ResponseGame> {
    return this.gamesService.findNextRelease(queryGameDto);
  }

  @Public()
  @HttpCode(200)
  @Get('recently-released')
  async findRecentlyReleased(@Query() queryGameDto: QueryGameDto):Promise<ResponseGame> {
    return this.gamesService.findRecentlyReleased(queryGameDto);
  }

  @Public()
  @HttpCode(200)
  @Get('most-anticipated')
  async findMostAnticipated(@Query() queryGameDto: QueryGameDto):Promise<ResponseGame> {
    return this.gamesService.findMostAnticipated(queryGameDto);
  }

  @Public()
  @HttpCode(200)
  @Get('search')
  async findGameByName(@Query() queryGameSearchDto: QueryGameSearchDto):Promise<ResponseGame> {
    return this.gamesService.findGameByName(queryGameSearchDto);
  }
}