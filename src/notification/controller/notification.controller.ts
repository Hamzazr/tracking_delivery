import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { NotificationService } from '../service/notification.service';
import { NotificationEntity } from '../model/notification.entity';
import { ColisNotification } from '../model/notification.interface';
import { Observable } from 'rxjs';

@Controller('colis/notification')
export class NotificationController {

    constructor(private readonly notificationService: NotificationService) { }

    @Post()
    create(@Body()notif: NotificationEntity, @Request() req ): Observable<ColisNotification> {
        return this.notificationService.create(notif);

    }
    

    @Get(':colisId')
    findOne(@Param('colisId') colisId: number, @Request() req ):Observable<ColisNotification> {
        return this.notificationService.findByColisId(colisId);

    }
}
