import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TrackingEventEntity } from "./event.entity";
import { PackageDetailsEntity } from "./packagedetail.entity";


@Entity()
export class TrackingEntity {

    @PrimaryGeneratedColumn()
    idTracking: number;

    @Column({unique: true})
    trackingNumber: string;

    @Column()
    shipperAddress: string;

    @Column()
    recipientAddress: string;

    @Column({nullable: true})
    shippingDate: string;

    @Column({nullable: true})
    actualDelivery: string;

    @Column({nullable: true})
    standardTransitTimeWindow: string;

    @OneToOne(() => PackageDetailsEntity, {
        cascade: true,
    })
    @JoinColumn()
    packageDetails: PackageDetailsEntity

    @OneToMany(() => TrackingEventEntity, (event) => event.tracking, {
        cascade: true,
    })
    events: TrackingEventEntity[];

    
}