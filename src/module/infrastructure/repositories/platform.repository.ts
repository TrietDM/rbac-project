// infrastructure/repositories/login-log.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlatformEntity } from '../entities/platform.entity';
import { IPlatformRepository } from 'src/module/domain/repositories/platformRepository.interface';
import { CreatePlatformDto } from 'src/module/controller/dtos/platform/createPlatform.dto';
import { UpdatePlatformDto } from 'src/module/controller/dtos/platform/updatePlatform.dto';

@Injectable()
export class PlatformRepository implements IPlatformRepository {
  constructor(
    @InjectRepository(PlatformEntity)
    private readonly repo: Repository<PlatformEntity>,
  ) {}

  async findByName(name: string): Promise<PlatformEntity | null>{  
    return await this.repo.findOne({
      where: {name}
    });
  } 

  async findById(id: number): Promise<PlatformEntity | null> {
    return await this.repo.findOne({
      where: {id},
      relations: ['users'],
    });
  }


  async findAll(): Promise<PlatformEntity[]> {
    return await this.repo.find();
  }

  async createPlatform(dto: CreatePlatformDto): Promise<PlatformEntity> {
    const platform = this.repo.create({ ...dto });

    return await this.repo.save(platform);
  }

  async updatePlatform(id: number, dto: UpdatePlatformDto): Promise<PlatformEntity> {
    const platform = await this.repo.findOne({ where: { id } });
    const updatedPlatform = { ...platform, ...dto };
    return await this.repo.save(updatedPlatform);
  }

  async deletePlatform(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async save(data: Partial<PlatformEntity>): Promise<PlatformEntity> {
    return await this.repo.save(data);
  }


}
