import { Module } from '@nestjs/common';
import { ControllerTracking } from '../controllers/tracking.controller';
import { ServiceTracking } from '../services/Tracking.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingEntity } from './tracking.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { PackageDetailModule } from './packagedetail.model';
import { PackageDetailsEntity } from './packagedetail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackingEntity, PackageDetailsEntity]),
    AuthModule,
    UserModule,
  ],
  controllers: [ControllerTracking],
  providers: [ServiceTracking]
})
export class TrackingModule {}
