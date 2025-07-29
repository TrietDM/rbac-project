import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class getListUserDto {
    @ApiPropertyOptional()
    @IsString()
    username?: string;

    @ApiPropertyOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional()
    @IsString()
    code?: string;

    @ApiPropertyOptional()
    @IsString()
    full_name?: string;
  }