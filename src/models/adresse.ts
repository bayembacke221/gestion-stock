import {Column} from "typeorm";

export class Adresse{
    @Column({name: 'rue',type: 'varchar',nullable:true})
    rue!: string;
    @Column({name: 'code_postal',type: 'varchar',nullable:true})
    codePostal!: string;
    @Column({name: 'ville',type: 'varchar',nullable:true})
    ville!: string;
    @Column({name: 'pays',type: 'varchar',nullable:true})
    pays!: string;
}