import { FeatureToggleEntity } from "src/module/infrastructure/entities/feature-toggle.entity";

export interface IFeatureToggleRepository {
  findAllEnable(): Promise<FeatureToggleEntity[] | null>;
  updateFeatureToggle(id: number): Promise<FeatureToggleEntity>;
  findByName(name: string): Promise<FeatureToggleEntity | null>;
  findById(id: number): Promise<FeatureToggleEntity | null>;
}
