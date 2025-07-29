import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitMQConfig } from 'src/module/domain/config/rabbitmq.interface';
import { DatabaseConfig } from '../../../domain/config/database.interface';
import { mustExist } from 'src/shared/utils/assert';

@Injectable()
export class EnvironmentConfigService
  implements DatabaseConfig, RabbitMQConfig
{
  constructor(private configService: ConfigService) {}

  getRabbitMQHost(): string {
    return mustExist(this.configService.get<string>('RABBITMQ_HOST'));
  }
  getRabbitMQUser(): string {
    return mustExist(this.configService.get<string>('RABBITMQ_USER'));
  }
  getRabbitMQPassword(): string {
    return mustExist(this.configService.get<string>('RABBITMQ_PASSWORD'));
  }

  getRabbitMQQueueService(): string {
    return mustExist(this.configService.get<string>('RABBITMQ_QUEUE_SERVICE'));
  }

  getDatabaseHost(): string {
    return mustExist(this.configService.get<string>('DATABASE_HOST'));
  }

  getDatabasePort(): number {
    return mustExist(this.configService.get<number>('DATABASE_PORT'));
  }

  getDatabaseUser(): string {
    return mustExist(this.configService.get<string>('DATABASE_USER'));
  }

  getDatabasePassword(): string {
    return mustExist(this.configService.get<string>('DATABASE_PASSWORD'));
  }

  getDatabaseName(): string {
    return mustExist(this.configService.get<string>('DATABASE_NAME'));
  }

  getDatabaseSchema(): string {
    return mustExist(this.configService.get<string>('DATABASE_SCHEMA'));
  }

  getDatabaseSync(): boolean {
    return mustExist(this.configService.get<boolean>('DATABASE_SYNCHRONIZE'));
  }
}
