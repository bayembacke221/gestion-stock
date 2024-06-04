import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {AbstractEntity} from "./abstractEntity";
import {Utilisateur} from "./utilisateur";

@Entity()
export class Role extends AbstractEntity{
    @Column({name: 'roleName',type: 'varchar',nullable:true})
    roleName!: string;
    @Column({name: 'description',type: 'varchar',nullable:true})
    description!: string;

    @ManyToOne(()=>Utilisateur,utilisateur=>utilisateur.roles)
    @JoinColumn({name: 'utilisateur_id'})
    utilisateur!: Utilisateur;
}