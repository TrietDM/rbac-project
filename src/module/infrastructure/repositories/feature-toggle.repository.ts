// infrastructure/repositories/login-log.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFeatureToggleRepository } from 'src/module/domain/repositories/feature-toggleRepository.interface';
import { FeatureToggleEntity } from '../entities/feature-toggle.entity';
import { mustExist } from 'src/shared/utils/assert';

@Injectable()
export class FeatureToggleRepository implements IFeatureToggleRepository {
  constructor(
    @InjectRepository(FeatureToggleEntity)
    private readonly repo: Repository<FeatureToggleEntity>,
  ) {}

  async findAllEnable(): Promise<FeatureToggleEntity[] | null> {
    return await this.repo.find({
      where: {isEnabled: true}
    })
  }

  async updateFeatureToggle(id: number): Promise<FeatureToggleEntity>{
    const toggle = mustExist(await this.repo.findOne({
      where: {id}
    }));
    toggle.isEnabled = !toggle?.isEnabled;
    return await this.repo.save(toggle);
  }

  async findByName(name: string): Promise<FeatureToggleEntity | null> {
    return await this.repo.findOne({
      where: {feature: name}
    })
  }
  async findById(id: number): Promise<FeatureToggleEntity | null> {
    return await this.repo.findOne({
      where: {id}
    })
  }
}
