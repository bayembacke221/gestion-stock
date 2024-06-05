import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {AbstractEntity} from "./abstractEntity";
import {Adresse} from "./adresse";
import {Entreprise} from "./entreprise";
import {Role} from "./role";

@Entity()
export class Utilisateur extends AbstractEntity{

    @Column({name: 'nom',type: 'varchar',nullable:false})
    nom!: string;

    @Column({name: 'prenom',type: 'varchar',nullable:false})
    prenom!: string;

    @Column({name: 'email',type: 'varchar',nullable:false})
    email!: string;

    @Column({name: 'password',type: 'varchar',nullable:false})
    password!: string;

    @Column({name: 'telephone',type: 'varchar',nullable:false})
    telephone!: string;

    @Column(type => Adresse)
    adresse!: Adresse;

    @Column({name: 'date_naissance',type: 'date',nullable:false})
    dateNaissance!: Date;

    @Column({name: 'photo',type: 'varchar',nullable:false})
    photo!: string;

    @ManyToOne(() => Entreprise, entreprise => entreprise.id, { nullable: true })
    @JoinColumn({ name: 'entreprise_id' })
    entreprise?: Entreprise;

    @OneToMany(()=>Role,roles=>roles.utilisateur,{eager:true})
    roles!: Role[];

}