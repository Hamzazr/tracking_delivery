
import { RecipientEntity } from "src/recipient/model/recipient.entity";
import { TransporteurE } from "src/transporteur/models/trans.entity";
import { UserEntity } from "src/user/models/user.entity";
import { Column, Double, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('colis_entity')
export class ColisEntity {

    @PrimaryGeneratedColumn()
    id_colis: number;

    @Column({unique: true})
    suivi_numero: number;

    @Column()
    statut: string; 

    @Column({nullable: true})
    description: string;
    
    @Column({nullable: true})
    emplacement: string;

    @ManyToOne(type => TransporteurE, TransporteurE => TransporteurE.colis, {nullable: true})
    transporteur : TransporteurE;

    @ManyToOne(type => RecipientEntity, RecipientEntity => RecipientEntity.colis, {nullable: true})
    recipient : RecipientEntity;

    @ManyToOne(type => UserEntity, UserEntity => UserEntity.colis)
    sender : UserEntity; 
    
} 