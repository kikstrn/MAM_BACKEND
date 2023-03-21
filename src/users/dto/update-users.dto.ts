import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsObjectID } from "../../core/custom-validator";
import { CreateUsersDto } from "./create-users.dto";

export class UpdateUsersDto extends PartialType(CreateUsersDto) {
    @IsNotEmpty()
    @IsObjectID()
    _id: string;

    @IsOptional()
    @IsBoolean()
    isAdmin: boolean;
}