import { ColisEntity } from "src/colis/models/colis.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('recipient_entity')
export class RecipientEntity{
 
    @PrimaryGeneratedColumn()
    id_recipient: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({unique: true})
    email: string;

    @Column()
    phone: string;

    @Column({nullable: true})
    country: string;

    @OneToMany(type => ColisEntity, colis => colis.recipient)
    colis: ColisEntity[];

    @BeforeInsert()
    emailToLoweCase() {
        this.email = this.email.toLowerCase();
    }
}