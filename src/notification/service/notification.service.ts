import { Injectable } from '@nestjs/common';
import { NotificationEntity } from '../model/notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Observable, from, of, switchMap } from 'rxjs';
import { TrackingEntity } from 'src/tracking/models/tracking.entity';
import { Tracking } from 'src/tracking/models/tracking.interface';
import { ColisNotification } from '../model/notification.interface';
import { ColisEntity } from 'src/colis/models/colis.entity';
import { Colis } from 'src/colis/models/colis.interface';
import axios from 'axios';

@Injectable()
export class NotificationService {

    constructor(
        @InjectRepository(NotificationEntity) private readonly notificationRepository: Repository<NotificationEntity>,
    ) { }

    create(trackEntity: NotificationEntity): Observable<NotificationEntity> {
        return from(this.notificationRepository.save(trackEntity));
    }

    async findByColisId(idColis: number): Promise<ColisNotification> {
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

        const value = await this.notificationRepository.findOne(options);

        if (value != null) {
            return Promise.resolve(value);
        } else {
            const colisData: Colis = {
                id_colis: idColis,
            };
            const data: ColisNotification = {
                senderContactName: "Someone",
                senderContactEmail: "yassir@safe.ma",
                notifyOnDelivery: true,
                notifyOnEstimatedDeliveryDateChange: true,
                notifyOnException: true,
                notifyOnTendered: true,
                currentResult: true,
                colis: colisData
            }
            return Promise.resolve(data)
        }

    }

    async sendColisNotification(data: any): Promise<any> {

        const token = await this.authToken();
        console.log("token ", token)
        console.log("data ", data)

        axios.interceptors.request.use(request => {
            console.log('Starting Request', JSON.stringify(request, null, 2))
            return request
        })
        axios.interceptors.response.use(response => {
            console.log('Response:', JSON.stringify(response, null, 2))
            return response
        })

        return axios.post<any>('https://apis-sandbox.fedex.com/track/v1/notifications', data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });

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

    async authToken() {
        const formData = new URLSearchParams();
        formData.append('grant_type', 'client_credentials');
        formData.append('client_id', 'l7bfea77bc57c942ec915617cfc67456fd');
        formData.append('client_secret', '95a03e4e16e649de9d3be8e468a992a4');

        try {
            const response = await axios.post('https://apis-sandbox.fedex.com/oauth/token', formData, {

                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            console.log('Response:', response.data);
            return response.data["access_token"];
        } catch (error) {
            console.error('Error:', error.message);
            return "";
        }
    }

}
