import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, IsInt } from 'class-validator';
export class createPermissionDto {
    @ApiProperty()
    @IsString()
    name: string;

    
  }