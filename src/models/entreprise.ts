import {Column, Entity, OneToMany} from "typeorm";
import {AbstractEntity} from "./abstractEntity";
import {EmbeddedMetadata} from "typeorm/metadata/EmbeddedMetadata";
import {Adresse} from "./adresse";
import {Utilisateur} from "./utilisateur";

@Entity()
export class Entreprise extends AbstractEntity{
    @Column({name: 'nom',type: 'varchar',nullable:false})
    nom!: string;

    @Column({name: 'description',type: 'varchar',nullable:false})
    description!: string;

    @Column(type => Adresse)
    adresse!: Adresse;

    @Column({name: 'codefiscal',type: 'varchar',nullable:false})
    codeFiscal!: string;

    @Column({name: 'photo',type: 'varchar',nullable:false})
    photo!: string;

    @Column({name: 'email',type: 'varchar',nullable:false})
    email!: string;

    @Column({name: 'telephone',type: 'varchar',nullable:false})
    telephone!: string;

    @Column({name: 'site_web',type: 'varchar',nullable:false})
    siteWeb!: string;

}