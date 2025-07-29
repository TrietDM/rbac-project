import { createRoleDto } from "src/module/controller/dtos/role/createRole.dto";
import { RoleEntity } from "../../infrastructure/entities/role.entity";
import { updateRoleDto } from "src/module/controller/dtos/role/updateRole.dto";

export interface IRoleRepository {
  findAll(): Promise<RoleEntity[]>;
  create(dto: createRoleDto): Promise<RoleEntity>;
  update(id: number, dto: updateRoleDto): Promise<RoleEntity>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<any>;
  findByName(name: string): Promise<any>;
  save(data: Partial<RoleEntity>): Promise<RoleEntity>

}
