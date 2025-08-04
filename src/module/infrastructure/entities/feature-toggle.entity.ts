import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('feature_toggle')
export class FeatureToggleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  feature: string;

  @Column({ default: true })
  isEnabled: boolean;


}
