import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TrackingEntity } from './tracking.entity';

@Entity()
export class TrackingEventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  date: string;

  @Column({nullable: true})
  eventType: string;

  @Column({nullable: true})
  eventDescription: string;

  @Column({nullable: true})
  exceptionCode: string;

  @Column({nullable: true})
  exceptionDescription: string;

  @Column({ type: 'json' })
  scanLocation: {
    streetLines: string[];
    city: string;
    stateOrProvinceCode: string;
    postalCode: string;
    countryCode: string;
    residential: boolean;
    countryName: string;
  };

  @Column({nullable: true})
  locationId: string;

  @Column({nullable: true})
  locationType: string;

  @Column({nullable: true})
  derivedStatusCode: string;

  @Column({nullable: true})
  derivedStatus: string;

  @ManyToOne(() => TrackingEntity, (tacking) => tacking.events)
  tracking : TrackingEntity;
}
