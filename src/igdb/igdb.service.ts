import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { environement } from '../environements/environement.dev';
import { lastValueFrom } from 'rxjs';
import { IgdbResponseDto } from './dto/igdb.response.dto';
import {Cache} from 'cache-manager';
import { IgdbQueryDto } from './dto/igdb.query.dto';
import { SearchIgdbDto } from './dto/search.igdb.dto';
import { Igdb } from './dto/igdb.dto';
import { IgdbToken } from './model/igdb.token';
import { IgdbArtworkResponseDto } from './dto/igdb.artwork.response.dto';

@Injectable()
export class IgdbService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private httpService: HttpService){}

  #API_URL = "https://api.igdb.com/v4";

  imgSize = {
    cover_small:'t_cover_small',
    screenshot_med:'t_screenshot_med',
    cover_big:'t_cover_big',
    logo_med:'t_logo_med',
    screenshot_big:'t_screenshot_big',
    screenshot_huge:'t_screenshot_huge',
    thumb:'t_thumb',
    micro:'t_micro',
    _720p:'t_720p',
    _1080p:'t_1080p'
  }

  async igdbFind(igdbQueryDto:IgdbQueryDto):Promise<IgdbResponseDto> {
    const data = `fields id,cover.*,artworks.*,name,platforms.*,screenshots.*,total_rating,total_rating_count,genres.*;limit ${igdbQueryDto.limit}; offset ${igdbQueryDto.offset}; where category = 0;`;
    const options = await this.optionsAxios();
    return lastValueFrom(this.httpService.post(`${this.#API_URL}/games`, data, options))
      .then(data=>{
        return Object.assign(new IgdbResponseDto(),{
          data:data.data,
          nextRoute:`/igdb?offset=${igdbQueryDto.offset+igdbQueryDto.limit}&limit=${igdbQueryDto.limit}`,
        });
      });
  }

  async igdbFindById(id: number):Promise<IgdbResponseDto> {
    const data = `fields id,cover.*,artworks.*,name,platforms.*,screenshots.*,total_rating,total_rating_count,genres.*;where id =${id} & category = 0;`;
    const options = await this.optionsAxios();
    return lastValueFrom(this.httpService.post(`${this.#API_URL}/games`, data, options))
      .then(data=>{
        return Object.assign(new IgdbResponseDto(),{data:data.data});
      });
  }

  async igdbArtworks(queryIgdbDto: IgdbQueryDto):Promise<IgdbArtworkResponseDto> {
    const data = `fields *,game.id,game.name;limit ${queryIgdbDto.limit}; offset ${queryIgdbDto.offset};`;
    const options = await this.optionsAxios();
    return lastValueFrom(this.httpService.post(`${this.#API_URL}/artworks`, data, options))
      .then(data=>{
        return Object.assign(new IgdbArtworkResponseDto(),{data:data.data,nextRoute:`/igdb/artworks?offset=${queryIgdbDto.offset+queryIgdbDto.limit}&limit=${queryIgdbDto.limit}`});
      });
  }

  async igdbPopularGames(queryIgdbDto: IgdbQueryDto):Promise<IgdbArtworkResponseDto> {
    const data = `fields *,game.id,game.name;limit ${queryIgdbDto.limit}; offset ${queryIgdbDto.offset};sort total_rating desc;where total_rating_count > 20 & category = 0 & release_dates.date >= 1609455600 & rating != null;`;
    const options = await this.optionsAxios();
    return lastValueFrom(this.httpService.post(`${this.#API_URL}/games`, data, options))
      .then(data=>{
        return Object.assign(new IgdbArtworkResponseDto(),{data:data.data,nextRoute:`/igdb/popular_games?offset=${queryIgdbDto.offset+queryIgdbDto.limit}&limit=${queryIgdbDto.limit}`});
      });
  }

  async igdbSearchGames(searchIgdbDto: SearchIgdbDto):Promise<IgdbResponseDto>{
    let data = `fields id,cover.*,artworks.*,name,platforms.*,screenshots.*,total_rating,total_rating_count,genres.*;search "${searchIgdbDto.game}";where category = 0;`;
    const options = await this.optionsAxios();
    return lastValueFrom(this.httpService.post<Igdb[]>(`${this.#API_URL}/games`, data, options))
      .then(data=>{
        return Object.assign(new IgdbResponseDto(),{data:data.data});
      });
  }

  async optionsAxios() {
    return {
      headers:{
        'Content-Type': 'application/text','Client-ID': environement.IGDB.ID,'Authorization': `Bearer ${await this.getToken()}`
      }
    };
  }

  async getToken():Promise<string>{
    return this.cacheManager.get('tokenIgdb').then(async (token:string)=>{
      if(!token){
        const tokenIgdb = await this.refreshTokenIgdb().catch(err=>{
          throw new HttpException(err,HttpStatus.BAD_REQUEST);
        });
        await this.cacheManager.set('tokenIgdb', tokenIgdb.access_token, { ttl: tokenIgdb.expires_in });
        return tokenIgdb.access_token;
      }else{
        return token;
      }
    }).catch((e)=>{
      throw new HttpException('Error refresh token IGDB',HttpStatus.BAD_REQUEST);
  });
  }

  async refreshTokenIgdb():Promise<IgdbToken>{
    const url = `https://id.twitch.tv/oauth2/token?client_id=${environement.IGDB.ID}&client_secret=${environement.IGDB.SECRET}&grant_type=client_credentials`
    return lastValueFrom(this.httpService.post(url)).then(rslt=>{
      return Object.assign(new IgdbToken(),rslt.data);
    });
  }
}