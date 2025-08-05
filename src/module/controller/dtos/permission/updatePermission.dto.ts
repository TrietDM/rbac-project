import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail,  IsOptional,  Length } from 'class-validator';
export class UpdatePermissionDto {
    @ApiProperty()
    @IsString()
    name: string;

  }