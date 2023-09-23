import { type } from "os";
import { ColisEntity } from "src/colis/models/colis.entity";
import { TrackingEntity } from "src/tracking/models/tracking.entity";
import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany} from "typeorm";


@Entity('user_entity')
export class UserEntity{
 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({unique: true})
    email: string;

    @Column()
    adresse: string;

    @Column({nullable: true})
    country: string;

    @Column()
    ville: string;

    @Column({select: false}) 
    password: string;

    @OneToMany(type => ColisEntity, colis_ => colis_.sender, { cascade: true , nullable: true})
    colis: ColisEntity[];

    // @OneToMany(type => TrackingEntity, shipments => shipments.client)
    // shipment: TrackingEntity[];

    @BeforeInsert()
    emailToLoweCase() {
        this.email = this.email.toLowerCase();
    }
}