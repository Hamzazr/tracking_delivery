import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransporteurE } from './models/trans.entity';

import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([TransporteurE]),
        AuthModule
    ]
})
export class TransporteurModule {}
