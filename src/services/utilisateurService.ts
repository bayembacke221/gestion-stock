import { FindOptionsWhere, Repository } from "typeorm";
import { Utilisateur } from "../models/utilisateur";
import { AbstractService } from "./abstarctService";

export class UserService extends AbstractService<Utilisateur> {
  constructor(repository: Repository<Utilisateur>) {
    super(repository);
  }

  async getByFilter(
    filter: FindOptionsWhere<Utilisateur>
  ): Promise<Utilisateur | null> {
    return await this.repository.findOne({
      where: filter,
      relations: ["roles"], 
    });
  }
}
