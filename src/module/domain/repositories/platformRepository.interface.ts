import { PlatformEntity } from "src/module/infrastructure/entities/platform.entity";

export interface IPlatformRepository {
  findByName(name: string): Promise<PlatformEntity | null>;
}
