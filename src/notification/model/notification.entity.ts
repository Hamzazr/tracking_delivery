import { ColisEntity } from "src/colis/models/colis.entity";
import { TrackingEntity } from "src/tracking/models/tracking.entity";
import { Tracking } from "src/tracking/models/tracking.interface";
import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('notification_entity')
export class NotificationEntity{
 
    @PrimaryGeneratedColumn()
    idNotification: number;

    @Column()
    senderContactName: string;

    @Column()
    senderContactEmail: string;

    @Column({default: false})
    notifyOnDelivery: boolean;

    @Column({default: false})
    notifyOnEstimatedDeliveryDateChange: boolean;
    
    @Column({default: false})
    notifyOnException: boolean;

    @Column({default: false})
    notifyOnTendered: boolean;

    @Column({default: false})
    currentResult: boolean;

    @OneToOne(() => ColisEntity)
    @JoinColumn()
    colis: ColisEntity

}