import {BaseEntity, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {type} from "node:os";

@Entity()
export class AbstractEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn({name: 'created_at',type: 'timestamp',nullable:false,update: false})
    createdAt!: Date;

    @CreateDateColumn({name: 'last_modified_at',type: 'timestamp',nullable:false,update: true})
    lastModifiedAt!: Date;


}