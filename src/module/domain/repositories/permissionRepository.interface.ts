import { createPermissionDto } from "../../controller/dtos/permission/createPermission.dto";
import { updatePermissionDto } from "../../controller/dtos/permission/updatePermission.dto";
import { PermissionEntity } from "../../infrastructure/entities/permission.entity";

export interface IPermissionRepository {
  findAll(): Promise<PermissionEntity[]>;
  create(dto: createPermissionDto): Promise<PermissionEntity>;
  update(id: number, dto: updatePermissionDto): Promise<PermissionEntity>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<any>;
  findByIds(id: number[]): Promise<any>;

  findByName(name: string): Promise<any>;

}
