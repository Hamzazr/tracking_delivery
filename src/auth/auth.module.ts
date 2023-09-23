import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService} from '@nestjs/config'
import { AuthService } from './services/auth.service';

import { JwtAuthGuard } from './guards/jwt-guard';
import { JwtStrategy } from './guards/jwt-strategy';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { RolesGuard } from './guards/roles.guard';


@Module({
    imports: [
        forwardRef(() => UserModule),
        PassportModule.register({ defaultStrategy:'jwt' }),
        JwtModule.registerAsync({
            //global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({

                 signOptions: { expiresIn: '10000s' },
                 secret: configService.get('JWT_SECRET'),
                 
            })
        }) 
    ],
    providers: [AuthService, JwtAuthGuard, JwtStrategy, RolesGuard ],
    exports: [AuthService]
})
export class AuthModule {}
