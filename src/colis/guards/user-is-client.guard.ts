import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserService } from "src/user/services/user.service";
import { ColisService } from "../services/colis.service";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { Observable} from "rxjs";
import {map, switchMap } from "rxjs/operators";
import { User } from "src/user/models/user.interface";
import { Colis } from "../models/colis.interface";
import { ColisEntity } from "../models/colis.entity";
import { UserEntity } from "src/user/models/user.entity";


@Injectable()
export class UserIsClientGuard implements CanActivate {
    //
    constructor(private userService : UserService, private colisService : ColisService){}

    canActivate(context: ExecutionContext): Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const params = request.params;
        const colisId: number = Number(params.id);
        const user: User = request.user;

        return this.userService.findOne(user.id).pipe(
            switchMap((user: User) => this.colisService.findOne(colisId).pipe(
                map((colis: Colis) => {
                    let hasPermission = false;

                    if(user.id === colis.sender.id){
                        hasPermission = true;
                    }

                    return user && hasPermission;
                })
            ))
        )
    }
}