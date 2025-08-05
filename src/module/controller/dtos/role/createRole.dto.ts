import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, IsInt } from 'class-validator';
export class CreateRoleDto {
    @ApiProperty()
    @IsString()
    name: string;

    
  }