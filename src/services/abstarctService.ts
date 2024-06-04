import {DeepPartial, DeleteResult, FindOptionsWhere, ObjectLiteral, Repository} from "typeorm";
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";


export abstract class AbstractService<T extends ObjectLiteral> {
    protected repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this.repository = repository;
    }

    async getAll(filter: FindOptionsWhere<T>): Promise<T[]> {
        return await this.repository.find({where: filter});
    }

    async getById(filter: FindOptionsWhere<T>): Promise<T | null> {
        return await this.repository.findOne(filter);
    }

    async notExist(filter: FindOptionsWhere<T>): Promise<boolean> {
        const data = await this.repository.find(
            { where: filter }
        )
        return data.length <= 0
    }

    async getByFilter(filter: FindOptionsWhere<T>): Promise<T | null> {
        return await this.repository.findOne(
            {where: filter}
        )
    }

    async create(data: DeepPartial<T>): Promise<T> {
        return await this.repository.save(data);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }

    async update(filter: FindOptionsWhere<T>, data: QueryDeepPartialEntity<T>): Promise<T | null> {
        await this.repository.update(filter, data)
        return await this.repository.findOneBy(filter);
    }



}