import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AssignPlatformDto {
  @ApiProperty()
  @IsNumber()
  platformId: number;

  @ApiProperty()
  @IsNumber()
  userId: number;
}
