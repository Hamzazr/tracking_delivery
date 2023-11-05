import { Injectable } from '@nestjs/common';
import { Colis } from '../models/colis.interface';
import { Observable, from } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { InjectRepository } from '@nestjs/typeorm';
import { ColisEntity } from '../models/colis.entity';
import { FindManyOptions, Repository, FindOneOptions } from 'typeorm';
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/user/models/user.interface';
import { Transporteur } from 'src/transporteur/models/trans.interface';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { UserEntity } from 'src/user/models/user.entity';


@Injectable()
export class ColisService {

    constructor(
        @InjectRepository(ColisEntity) private readonly colisRepository: Repository<ColisEntity>,
        private userService: UserService
    ) { }

    // async create(user : User, colis: Colis): Promise<Colis>{
    //     colis.client = user;
    //     console.log(colis);
    //     const createdColis = await this.colisRepository.insert(colis);
    //     return createdColis.raw[0];
    //     //return this.colisRepository.save(colis);
    // }

    //  ------------------------------------------------------------
    create(user: UserEntity, colis: ColisEntity): Observable<Colis> {
        colis.sender = user;
        console.log(colis);

        return from(this.colisRepository.save(colis));

    }
    //  ------------------------------------------------------------

    findAll(): Observable<Colis[]> {
        return from(this.colisRepository.find({ relations: ['client'] }));
    }

    // findByUser(userId: number): Observable<Colis[]> {
    //     return from(this.colisRepository.find({
    //         where: {
    //             client: {id : userId},
    //         },
    //         relations: ['client'],
    //     })).pipe( map((colisE: Colis[]) => colisE) )

    // }

    // findOne(id: number): Observable<Colis> {
    //     return from(this.colisRepository.findOne({id}, { relations: ['client'] }));
    // }

    //  ------------------------------------------------------------
    findOne(id_colis: number): Observable<Colis> {
        const options: FindOneOptions<ColisEntity> = {
            where: { id_colis },
            relations: ['sender'],
        };

        return from(this.colisRepository.findOne(options));
    }

    paginateAll(options: IPaginationOptions): Observable<Pagination<Colis>> {
        return from(paginate<Colis>(this.colisRepository, options, {

            relations: ['sender']

        })).pipe(
            map((colis: Pagination<Colis>) => colis)
        )
    }

    updateOne(id: number, colis: ColisEntity): Observable<Colis> {
        return from(this.colisRepository.update(id, colis)).pipe(
            switchMap(() => this.findOne(id))
        )
    }
    //  ------------------------------------------------------------
    deleteOne(id: number): Observable<any> {
        return from(this.colisRepository.delete(id));
    }
}
