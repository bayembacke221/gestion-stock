import {Repository} from "typeorm";
import {Utilisateur} from "../models/utilisateur";
import {AbstractService} from "./abstarctService";

export class UserService extends AbstractService<Utilisateur> {

    constructor(repository: Repository<Utilisateur>) {
        super(repository);
    }


}
