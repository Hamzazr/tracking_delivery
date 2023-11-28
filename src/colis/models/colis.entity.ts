
import { RecipientEntity } from "src/recipient/model/recipient.entity";
import { TransporteurE } from "src/transporteur/models/trans.entity";
import { UserEntity } from "src/user/models/user.entity";
import { Column, Double, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('colis_entity')
export class ColisEntity {

    @PrimaryGeneratedColumn()
    id_colis: number;

    @Column()
    trackingNumber: string;

    @Column({ nullable: true })
    countryOrigin: string;

    @Column({ nullable: true })
    countryDestination: string;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    orderNumber: string;

    @ManyToOne(() => TransporteurE, transporteurE => transporteurE.colis, {
        nullable: true, cascade: true,
    })
    transporteur: TransporteurE;

    @ManyToOne(() => RecipientEntity, recipient => recipient.colis, {
        nullable: true, cascade: true,
    })
    recipient: RecipientEntity;

    @ManyToOne(() => UserEntity, (user) => user.shippements)
    user: UserEntity
} 