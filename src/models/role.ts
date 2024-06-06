import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstractEntity";
import { Utilisateur } from "./utilisateur";

@Entity()
export class Role extends AbstractEntity {
  @Column({ name: "roleName", type: "varchar", nullable: true })
  roleName!: string;
  @Column({ name: "description", type: "varchar", nullable: true })
  description!: string;

  @ManyToMany(() => Utilisateur, (utilisateur) => utilisateur.roles)
  utilisateurs!: Utilisateur[];
}
