// infrastructure/repositories/login-log.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlatformEntity } from '../entities/platform.entity';
import { mustExist } from 'src/shared/utils/assert';
import { IPlatformRepository } from 'src/module/domain/repositories/platformRepository.interface';

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
}
