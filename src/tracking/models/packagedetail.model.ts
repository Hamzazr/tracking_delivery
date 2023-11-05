import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";
import { ControllerTracking } from "../controllers/tracking.controller";
import { ServiceTracking } from "../services/Tracking.service";
import { PackageDetailsEntity } from "./packagedetail.entity";
import { TrackingModule } from "../tracking.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([PackageDetailsEntity]),
        AuthModule,
        UserModule,
    ],
})
export class PackageDetailModule { }
