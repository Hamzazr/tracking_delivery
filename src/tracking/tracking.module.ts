import { Module } from '@nestjs/common';
import { ControllerTracking } from './controllers/tracking.controller';
import { ServiceTracking } from './services/Tracking.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingEntity } from './models/tracking.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackingEntity]),
    AuthModule,
    UserModule
  ],
  controllers: [ControllerTracking],
  providers: [ServiceTracking]
})
export class TrackingModule {}
