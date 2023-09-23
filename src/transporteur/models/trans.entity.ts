import { ColisEntity } from "src/colis/models/colis.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('transporteur_entity')
export class TransporteurE{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @OneToMany(type => ColisEntity, (colis) => colis.transporteur)
    colis: ColisEntity[];

}