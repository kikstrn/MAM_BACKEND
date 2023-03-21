import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Query } from '@nestjs/common';
import { IgdbArtworkResponseDto } from './dto/igdb.artwork.response.dto';
import { IgdbQueryDto } from './dto/igdb.query.dto';
import { IgdbResponseDto } from './dto/igdb.response.dto';
import { SearchIgdbDto } from './dto/search.igdb.dto';
import { IgdbService } from './igdb.service';

@Controller('igdb')
export class IgdbController {
  constructor(private readonly igdbService: IgdbService) {}

  @Get()
  async igdbFind(@Query() queryIgdbDto:IgdbQueryDto):Promise<IgdbResponseDto>{
    return await this.igdbService.igdbFind(queryIgdbDto).catch((error) => {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    });
  }

  @Get('game/:id')
  async igdbFindById(@Param('id', ParseIntPipe) id: number):Promise<IgdbResponseDto>{
    return await this.igdbService.igdbFindById(id).catch((error) => {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    });
  }

  @Get('search')
  async igdbSearchGames(@Query() searchIgdbDto:SearchIgdbDto):Promise<IgdbResponseDto>{
    return await this.igdbService.igdbSearchGames(searchIgdbDto).catch((error) => {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    });
  }

  @Get('artworks')
  async igdbArtworks(@Query() queryIgdbDto:IgdbQueryDto):Promise<IgdbArtworkResponseDto>{
    return await this.igdbService.igdbArtworks(queryIgdbDto).catch((error) => {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    });
  }

  @Get('popular_games')
  async igdbPopularGames(@Query() queryIgdbDto:IgdbQueryDto):Promise<IgdbArtworkResponseDto>{
    return await this.igdbService.igdbPopularGames(queryIgdbDto).catch((error) => {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    });
  }
}