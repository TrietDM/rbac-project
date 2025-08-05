import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class AssignPermissionDto {
  @ApiProperty()
  @IsNumber()
  roleId: number;

  @ApiProperty()
  @IsNumber()
  permissionId: number;
}
