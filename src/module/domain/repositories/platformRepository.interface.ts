import { CreatePlatformDto } from "src/module/controller/dtos/platform/createPlatform.dto";
import { UpdatePlatformDto } from "src/module/controller/dtos/platform/updatePlatform.dto";
import { PlatformEntity } from "src/module/infrastructure/entities/platform.entity";

export interface IPlatformRepository {
  findByName(name: string): Promise<PlatformEntity | null>;
  findById(id: number): Promise<PlatformEntity | null>;
  findAll(): Promise<PlatformEntity[]>;
  createPlatform(dto: CreatePlatformDto): Promise<PlatformEntity>;
  updatePlatform(id: number, dto: UpdatePlatformDto): Promise<PlatformEntity>;
  deletePlatform(id: number): Promise<void>;
  save(data: Partial<PlatformEntity>): Promise<PlatformEntity>;
}
