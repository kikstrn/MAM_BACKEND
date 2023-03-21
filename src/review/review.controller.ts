import { Controller, Get, Post, Body, Param, Delete, Patch, HttpCode, UnauthorizedException } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Public } from '../auth/decorators/public.decorator';
import { UserReq } from '../auth/decorators/user.decorator';
import { ParseObjectIdPipe } from '../decorators/decorator';
import { Review } from './schema/review.schema';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserToken } from '../auth/dto/user-token.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Public()
  @HttpCode(200)
  @Get('')
  async findAll():Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Public()
  @HttpCode(200)
  @Get(':id')
  async findById(@Param('id', ParseObjectIdPipe) id: string):Promise<Review> {
    return this.reviewService.findById(id);
  }

  @Public()
  @HttpCode(200)
  @Get('/game/:id')
  async findByIdGame(@Param('id', ParseObjectIdPipe) id: string):Promise<Review[]> {
    return this.reviewService.findByIdGame(id);
  }

  @Public()
  @HttpCode(200)
  @Get('/user/:id')
  async findByIdAuthor(@Param('id', ParseObjectIdPipe) id: string):Promise<Review[]> {
    return this.reviewService.findByIdAuthor(id);
  }

  @HttpCode(201)
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto, @UserReq() userToken: UserToken):Promise<Review> {
    return this.reviewService.create(createReviewDto, userToken);
  }

  @HttpCode(204)
  @Patch()
  async update(@Body() updateReviewDto: UpdateReviewDto, @UserReq() userToken: UserToken):Promise<void> {
    return this.reviewService.update(updateReviewDto, userToken);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: string, @UserReq() userToken: UserToken):Promise<void> {
    return this.reviewService.remove(id, userToken);
  }
}
