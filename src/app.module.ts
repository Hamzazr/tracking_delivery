import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
//import { UserEntity } from './user/models/user.entity';
import { AuthModule } from './auth/auth.module';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';

// import { ColisModule } from './colis/colis.module';
// import { TransporteurModule } from './transporteur/transporteur.module';

import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { dataSourceOptions } from './db/data-source';
import { TrackingModule } from './tracking/tracking.module';
import { RecipientController } from './recipient/controllers/recipient/recipient.controller';
import { RecipientService } from './recipient/services/recipient/recipient.service';
import { TransporteurModule } from './transporteur/transporteur.module';
import { ColisModule } from './colis/colis.module';
import { RecipientModule } from './recipient/recipient.module';
import { TrackingEventModule } from './tracking/models/event.model';
import { PackageDetailModule } from './tracking/models/packagedetail.model';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), 
    /** Hadi Dyalk */
    TypeOrmModule.forRoot( {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      password:'l7H4D5di6Bk_LxvuCcp9PRlaBd_WHBLz',
      synchronize: true,
    }),

    /** Hadi Dyali */
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   password: '123456',
    //   username: 'postgres',
    //   entities: [],
    //   database: 'track',
    //   synchronize: true,
    //   autoLoadEntities: true,
    //   logging: true,
    // }),
    UserModule,
    AuthModule,
    ColisModule,
    RecipientModule,
    TransporteurModule,
    TrackingModule,
    TrackingEventModule,
    PackageDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService]
}) 
export class AppModule {
  constructor( 
      // private dataSource: DataSource 
    ){}
}
