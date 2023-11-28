import { ColisEntity } from "src/colis/models/colis.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('recipient_entity')
export class RecipientEntity {

    @PrimaryGeneratedColumn()
    idRecipient: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    codePostal: string;

    @OneToMany(() => ColisEntity, colis => colis.recipient)
    colis: ColisEntity[];


}