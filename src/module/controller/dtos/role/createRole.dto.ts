import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, IsInt } from 'class-validator';
export class createRoleDto {
    @ApiProperty()
    @IsString()
    name: string;

    
  }