import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { IsObjectID } from '../../core/custom-validator';
import { User } from '../../users/schema/users.schema';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
    @IsNotEmpty()
    @IsObjectID()
    _id: string;

    @IsOptional()
    @IsArray()
    @Type(()=>User)
    players: User[];
}
