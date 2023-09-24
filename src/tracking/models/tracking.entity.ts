import { UserEntity } from "src/user/models/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsEnum } from 'class-validator';
import { TrackingStatus } from "./trackingstatus.enum";


@Entity()
export class TrackingEntity {
    @PrimaryGeneratedColumn()
    id_Tracking: number;

    @Column({unique: true})
    Tracking_Number: string;

    @Column()
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
    
    @Column({nullable: true})
    trackingstatus: string;

    
}