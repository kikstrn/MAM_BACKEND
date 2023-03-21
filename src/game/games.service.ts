import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { QueryGameDto } from "./dto/query/query-game.dto";
import { QueryGameSearchDto } from "./dto/query/query-game-search.dto";
import { ResponseGame } from "./dto/response-games.dto";
import { lastValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { plainToInstance } from "class-transformer";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Game } from "./schema/game.schema";

@Injectable()
export class GamesService {
  Logger = new Logger(Game.name);
  constructor(
    @InjectModel(Game.name) private readonly gameModel: Model<Game>,
    private readonly httpService: HttpService
  ){}

  async findAll(queryGameDto: QueryGameDto): Promise<ResponseGame> {
    const games = await this.gameModel.find().skip(queryGameDto.offset).limit(queryGameDto.limit).exec().catch((e) => { throw new BadRequestException() });
    return plainToInstance(ResponseGame, { data: plainToInstance(Game, games), next_route: `/games?offset=${ queryGameDto.limit + queryGameDto.offset }&limit=${ queryGameDto.limit }` })
  }

  async findById(id: string): Promise<Game> {
    let game = await this.gameModel.findById(id).orFail().exec().catch((e) => { throw new NotFoundException() });
    if(!game.summary_trad_fr && game.summary){
      game.summary_trad_fr = await this.translate(game.summary);
      game.save();
    }
    return plainToInstance(Game, game);
  }

  async findGameArtwork(queryGameDto: QueryGameDto):Promise<ResponseGame> {
    const games = await this.gameModel.find().where('artworks.0').exists(true).where('hypes').gt(1).skip(queryGameDto.offset).limit(queryGameDto.limit).exec();
    // const games = await this.gamesRepository.findGameArtwork(queryGameDto.offset,queryGameDto.limit);
    return plainToInstance(ResponseGame, { data: plainToInstance(Game, games), next_route: `/games/artworks?offset=${queryGameDto.limit + queryGameDto.offset}&limit=${queryGameDto.limit}` })
  }

  async countGameWithArtwork():Promise<number> {
    return this.gameModel.count().where('artworks.0').exists(true).where('hypes').gt(1).lean().exec();
  }

  async findPopularGame(queryGameDto: QueryGameDto):Promise<ResponseGame> {
    const games = await this.gameModel.find().where('rating').gt(0).sort({ total_rating_count: -1 }).skip(queryGameDto.offset).limit(queryGameDto.limit).lean().exec();
    return plainToInstance(ResponseGame, { data: plainToInstance(Game, games), next_route: `/games/popular-games?offset=${queryGameDto.limit + queryGameDto.offset}&limit=${queryGameDto.limit}` })
  }
  
  async findNextRelease(queryGameDto: QueryGameDto):Promise<ResponseGame> {
    const games = await this.gameModel.find().where('first_release_date').gt(Number(new Date())).sort({ first_release_date: 1 }).skip(queryGameDto.offset).limit(queryGameDto.limit).lean().exec();
    return plainToInstance(ResponseGame, { data: plainToInstance(Game, games), next_route: `/games/next-release?offset=${queryGameDto.limit + queryGameDto.offset}&limit=${queryGameDto.limit}` })
  }

  async findRecentlyReleased(queryGameDto: QueryGameDto):Promise<ResponseGame> {
    const games = await this.gameModel.find().where('first_release_date').lt(Number(new Date())).sort({ first_release_date: -1 }).skip(queryGameDto.offset).limit(queryGameDto.limit).lean().exec();
    return plainToInstance(ResponseGame, { data: plainToInstance(Game, games), next_route: `/games/recently-released?offset=${queryGameDto.limit + queryGameDto.offset}&limit=${queryGameDto.limit}` })
  }

  async findMostAnticipated(queryGameDto: QueryGameDto):Promise<ResponseGame> {
    const games = await this.gameModel.find().where('first_release_date').gt(Number(new Date())).sort({ hypes: -1 }).skip(queryGameDto.offset).limit(queryGameDto.limit).lean().exec();
    return plainToInstance(ResponseGame, { data: plainToInstance(Game, games), next_route: `/games/most-anticipated?offset=${queryGameDto.limit + queryGameDto.offset}&limit=${queryGameDto.limit}` })
  }

  async findGameByName(queryGameSearchDto: QueryGameSearchDto):Promise<ResponseGame> {
    const games = await this.gameModel.find({name: { $regex: '.*' + queryGameSearchDto.game + '.*', $options: 'i' } }).sort({ hypes: -1 }).skip(0).limit(15).lean().exec();
    return plainToInstance(ResponseGame, { data: plainToInstance(Game, games), next_route: `` })
  }

  async translate(data: string):Promise<string> {
    const url = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=fr`
    const options = {
      headers:{
        'Ocp-Apim-Subscription-Key':'1fdfad75d7534cebbfb327258b74de8e',
        'Ocp-Apim-Subscription-Region':'francecentral'
      }
    }
    Logger.log(`Traduction d'un jeu`)
    let data_to_send = [{'Text':data}]
    let resp = await lastValueFrom(this.httpService.post(url, data_to_send, options)).catch((e) => { console.log(e); throw new BadRequestException() });
    return resp.data[0].translations[0].text ? resp.data[0].translations[0].text : null;
  }
}