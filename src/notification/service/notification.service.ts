import { Injectable } from '@nestjs/common';
import { NotificationEntity } from '../model/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Observable, from, switchMap } from 'rxjs';
import { TrackingEntity } from 'src/tracking/models/tracking.entity';
import { Tracking } from 'src/tracking/models/tracking.interface';
import { ColisNotification } from '../model/notification.interface';

@Injectable()
export class NotificationService {

    constructor(
        @InjectRepository(NotificationEntity) private readonly notificationRepository: Repository<NotificationEntity>,
    ) { }

    create(trackEntity: NotificationEntity): Observable<NotificationEntity> {
        return from(this.notificationRepository.save(trackEntity));
    }

    findByColisId(idColis: number): Observable<ColisNotification> {
        const options: FindOneOptions<NotificationEntity> = {
            relations: {
                colis: true,
            },
            where: {
                colis: {
                    id_colis: idColis
                },
            },
        };

        return from(this.notificationRepository.findOne(options));
    }

    findOne(idNotification: number): Observable<ColisNotification> {
        const options: FindOneOptions<NotificationEntity> = {
            where: {
                idNotification
            },
        };

        return from(this.notificationRepository.findOne(options));
    }

    updateOne(id: number, notificationEntity: NotificationEntity): Observable<ColisNotification> {
        return from(this.notificationRepository.update(id, notificationEntity)).pipe(
            switchMap(() => this.findOne(id))
        )
    }

}
