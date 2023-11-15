import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TrackingEventEntity } from "./event.entity";
import { PackageDetailsEntity } from "./packagedetail.entity";


@Entity()
export class TrackingEntity {

    @PrimaryGeneratedColumn()
<<<<<<< HEAD
    id_colis: number;
=======
    idTracking: number;
>>>>>>> aebaa779cebc17c296f3e20c13fae7a6087d916f

    @Column({unique: true})
    trackingNumber: string;

    @Column()
<<<<<<< HEAD
    Origin_Country: string;

    @Column({nullable: true})
    Destination_Country: string;

    @Column({nullable: true})
    Recipient_PostCode: number;

    @Column({nullable: true})
    shippingDate: Date;

    @Column({nullable: true})
    Title: string;

    @Column({nullable: true})
    OrderNumber: number;

    @Column({nullable: true})
    PhoneNumber: string;

    

    @Column({nullable: true})
    RecipientEmail: string;

    @Column()
    @IsEnum(TrackingStatus)
    status: TrackingStatus;
    
 
=======
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
>>>>>>> aebaa779cebc17c296f3e20c13fae7a6087d916f

    
}