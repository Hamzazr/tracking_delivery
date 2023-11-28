import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { NotificationService } from '../service/notification.service';
import { NotificationEntity } from '../model/notification.entity';
import { ColisNotification } from '../model/notification.interface';
import { Observable, from } from 'rxjs';

@Controller('colis/notification')
export class NotificationController {

    constructor(private readonly notificationService: NotificationService) { }

    @Post()
    create(@Body()notif: NotificationEntity, @Request() req ): Observable<ColisNotification> {
        return this.notificationService.create(notif);

    }

    @Post("/send")
    send(@Body()data: any, @Request() req ): Observable<any> {
        return from(this.notificationService.sendColisNotification(data));
    }
    

    @Get(':colisId')
    findOne(@Param('colisId') colisId: number, @Request() req ): Observable<ColisNotification> {
        return from(this.notificationService.findByColisId(colisId))
    }
}
