import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipientEntity } from './model/recipient.entity';
import { RecipientService } from './services/recipient/recipient.service';
import { RecipientController } from './controllers/recipient/recipient.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([RecipientEntity]),
        AuthModule
    ],
    providers: [ RecipientService ],
    controllers: [ RecipientController ]
})
export class RecipientModule {}
