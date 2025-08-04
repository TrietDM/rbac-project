import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IFeatureToggleRepository } from 'src/module/domain/repositories/feature-toggleRepository.interface';
import { masterDataErrorMessage } from 'src/module/infrastructure/message/master-data';

@Injectable()
export class FeatureToggleService {
  constructor(
    @Inject('IFeatureToggleRepository')
    private repo: IFeatureToggleRepository,
  ) {}

  async isEnabled(feature: string): Promise<boolean> {
    const toggle = await this.repo.findByName(feature);
    return toggle?.isEnabled ?? true;
  }

  async getEnabledFeatures(){
    return await this.repo.findAllEnable()
  }

  async updateFeature(id: number){
    const feature = await this.repo.findById(id);
    if(!feature)
      throw new HttpException(masterDataErrorMessage.E_010(),HttpStatus.NOT_FOUND);
    return this.repo.updateFeatureToggle(id);
  }
}
