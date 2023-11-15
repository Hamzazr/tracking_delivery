import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";
import { ControllerTracking } from "../controllers/tracking.controller";
import { ServiceTracking } from "../services/Tracking.service";
import { TrackingEventEntity } from "./event.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TrackingEventEntity]),
        AuthModule,
        UserModule
    ],
})
export class TrackingEventModule { }
