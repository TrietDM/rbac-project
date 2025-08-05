import { CreatePermissionDto } from "../../controller/dtos/permission/createPermission.dto";
import { UpdatePermissionDto } from "../../controller/dtos/permission/updatePermission.dto";
import { PermissionEntity } from "../../infrastructure/entities/permission.entity";

export interface IPermissionRepository {
  findAll(): Promise<PermissionEntity[]>;
  create(dto: CreatePermissionDto): Promise<PermissionEntity>;
  update(id: number, dto: UpdatePermissionDto): Promise<PermissionEntity>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<any>;

  findByName(name: string): Promise<any>;

}
