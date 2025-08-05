import { CreateRoleDto } from "src/module/controller/dtos/role/createRole.dto";
import { RoleEntity } from "../../infrastructure/entities/role.entity";
import { UpdateRoleDto } from "src/module/controller/dtos/role/updateRole.dto";

export interface IRoleRepository {
  findAll(): Promise<RoleEntity[]>;
  create(dto: CreateRoleDto): Promise<RoleEntity>;
  update(id: number, dto: UpdateRoleDto): Promise<RoleEntity>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<any>;
  findByName(name: string): Promise<any>;
  save(data: Partial<RoleEntity>): Promise<RoleEntity>

}
