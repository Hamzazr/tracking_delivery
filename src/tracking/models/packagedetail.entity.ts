import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { TrackingEntity } from './tracking.entity';

@Entity()
export class PackageDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true, name: "countPices"})
  count: number;

  @Column({nullable: true})
  weightValue: number;

  @Column({nullable: true})
  weightUnit: string;

  @Column({nullable: true})
  length: number;

  @Column({nullable: true})
  width: number;

  @Column({nullable: true})
  height: number;

  @Column({nullable: true})
  dimensionUnits: string;

  @Column({nullable: true})
  packaging: string;

}
