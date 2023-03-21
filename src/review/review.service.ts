import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model, ObjectId } from 'mongoose';
import { UserToken } from '../auth/dto/user-token.dto';
import { DuplicateMongoException } from '../core/duplicate-mongo.exception';
import { Game } from '../game/schema/game.schema';
import { User } from '../users/schema/users.schema';
import { UsersService } from '../users/users.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './schema/review.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
    private readonly userService: UsersService
  ) {}

  async findAll():Promise<Review[]> {
    const reviews = await this.reviewModel.find().populate('author',null,User.name).populate('game',null,Game.name).exec();
    return plainToInstance(Review, reviews);
  }

  async findById(id: string):Promise<Review> {
    const review = await this.reviewModel.findById(id).populate('author',null,User.name).populate('game',null,Game.name).orFail().catch((e) => { throw new NotFoundException() });
    return plainToInstance(Review, review);
  }

  async findByIdGame(id: string):Promise<Review[]> {
    const reviews = await this.reviewModel.find({ game: id }).populate('author',null, User.name).exec();
    return plainToInstance(Review, reviews);
  }

  async findByIdAuthor(id: string):Promise<Review[]> {
    const reviews = await this.reviewModel.find({ author: id }).populate('author',null,User.name).populate('game',null,Game.name).exec();
    return plainToInstance(Review, reviews);
  }

  async create(createReviewDto: CreateReviewDto, userToken: UserToken):Promise<Review> {
    const userRequest: User = await this.userService.findByIdLocal(userToken._id);
    if(userRequest._id.toHexString() != createReviewDto.author) throw new UnauthorizedException();

    const review = new this.reviewModel(createReviewDto);
    await review.save().catch((e) => { throw new DuplicateMongoException(e) });
    await review.populate('author',null);
    await review.populate('game',null);
    return plainToInstance(Review, review);
  }

  async update(updateReviewDto: UpdateReviewDto, userToken: UserToken):Promise<void> {
    const reviewToUpdate = await this.reviewModel.findById(updateReviewDto._id).orFail().lean().exec().catch((e) => { throw new NotFoundException() });
    const userRequest: User = await this.userService.findByIdLocal(userToken._id);

    if(userRequest.isAdmin || userRequest._id.toHexString() === reviewToUpdate.author._id.toHexString()){
      await this.reviewModel.findByIdAndUpdate(updateReviewDto._id, updateReviewDto, { lean: true }).orFail().exec().catch((e) => { throw new NotFoundException() });
    }else{
      throw new UnauthorizedException()
    }
  }

  async remove(id: string, userToken: UserToken):Promise<void> {
    const reviewToDelete = await this.reviewModel.findById(id).orFail().exec().catch((e) => { throw new NotFoundException() });
    const userRequest: User = await this.userService.findByIdLocal(userToken._id);

    if(userRequest.isAdmin || userRequest._id.toHexString() === reviewToDelete.author._id.toHexString()){
      await this.reviewModel.findByIdAndDelete(id).orFail().exec().catch((e) => { throw new NotFoundException() });
    }else{
      throw new UnauthorizedException()
    }
  }
}