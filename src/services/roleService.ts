import {In, Repository} from "typeorm";
import {AbstractService} from "./abstarctService";
import { Role } from "../models/role";


export class RoleService extends AbstractService<Role> {

    constructor(repository: Repository<Role>) {
        super(repository);
    }
    async getRolesByNames(roleNames: string[]): Promise<Role[]> {
        const existingRoles = await this.repository.find({
          where: { roleName: In(roleNames) }
        });
    
        const existingRoleNames = existingRoles.map(role => role.roleName);
        const missingRoleNames = roleNames.filter(name => !existingRoleNames.includes(name));
    
        const newRoles = missingRoleNames.map(name => {
          const role = new Role();
          role.roleName = name;
          role.description = '';
          return role;
        });
    
        const createdRoles = await this.repository.save(newRoles);
        return [...existingRoles, ...createdRoles];
      }
}