import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, ILike } from 'typeorm';


import { RoleEntity } from '../entities/role.entity';
import { mustExist } from 'src/shared/utils/assert';
import { IRoleRepository } from 'src/module/domain/repositories/roleRepository.interface';
import { CreateRoleDto } from 'src/module/controller/dtos/role/createRole.dto';
import { UpdateRoleDto } from 'src/module/controller/dtos/role/updateRole.dto';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepo: Repository<RoleEntity>,
  ) {}


  async findAll(): Promise<RoleEntity[]>{
    return await this.roleRepo.find();
  }

  async create(dto: CreateRoleDto): Promise<RoleEntity>{
      const newRole = this.roleRepo.create({
        ...dto
      });
      return await this.roleRepo.save(newRole);
  }

  async update(id: number, dto: UpdateRoleDto): Promise<RoleEntity> {
      const role = await this.roleRepo.findOne({where: {id: id}});
      const update = {...role,  ...dto};
      return await this.roleRepo.save(update);
  }


  async delete(id: number): Promise<void> {
    await this.roleRepo.delete(id);
  }

  async findById(id: number): Promise<any> {
    return await this.roleRepo.findOne({
      where :{id},
    });
  }
  async findByName(name: string): Promise<any> {
    return await this.roleRepo.findOne({
      where :{name}
    });
  }

  async save(data: Partial<RoleEntity>): Promise<RoleEntity> {
    return await this.roleRepo.save(data);
  }
}
 