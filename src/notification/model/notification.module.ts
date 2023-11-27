import { Module } from '@nestjs/common';


import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { NotificationEntity } from './notification.entity';
import { NotificationController } from '../controller/notification.controller';
import { NotificationService } from '../service/notification.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationEntity]),
    AuthModule,
    UserModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
