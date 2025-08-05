import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail,  IsOptional,  Length } from 'class-validator';
export class UpdateRoleDto {

    @ApiProperty()
    @IsString()
    name: string;

  }