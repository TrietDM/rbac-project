import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class AssignRoleDto {
  @ApiProperty()
  @IsNumber()
  roleId: number;

  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  userIds: number[];
}
