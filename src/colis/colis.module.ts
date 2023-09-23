import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColisEntity } from './models/colis.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { TransporteurModule } from 'src/transporteur/transporteur.module';
import { ColisController } from './controllers/colis.controller';
import { ColisService } from './services/colis.service';



@Module({
    imports: [ 
        // forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([ColisEntity]),
        AuthModule,
        UserModule,
        TransporteurModule
],
    providers: [ColisService],
    controllers: [ ColisController]
})
export class ColisModule {}
