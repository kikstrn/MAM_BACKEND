import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { IsObjectID } from '../../core/custom-validator';
import { CreateReviewDto } from './create-review.dto';

export class UpdateReviewDto extends PartialType(OmitType(CreateReviewDto, ['game', 'author'] as const)) {
    @IsNotEmpty()
    @IsObjectID()
    _id: string;
}