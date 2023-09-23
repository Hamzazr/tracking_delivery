import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { AuthModule } from 'src/auth/auth.module';

//import { ColisEntity } from 'src/colis/models/colis.entity';

@Module({
  imports: [
      forwardRef(() => AuthModule),
      TypeOrmModule.forFeature([UserEntity]),
      
  ], 
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
