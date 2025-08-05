import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail,  IsOptional,  IsInt } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone_num: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  }