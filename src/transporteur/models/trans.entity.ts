import { ColisEntity } from "src/colis/models/colis.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('transporteur_entity')
export class TransporteurE {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    email: string;

    @OneToMany(() => ColisEntity, (colis) => colis.transporteur, { nullable: true })
    colis: ColisEntity[];

}