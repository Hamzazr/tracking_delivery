import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, of, switchMap } from 'rxjs';

// import { Colis } from 'src/colis/models/colis.interface';
// import { ColisService } from 'src/colis/services/colis.service';

import { User } from 'src/user/models/user.interface';

const bcrypt = require('bcrypt'); 


@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService){ } 

    // generateJWTAndCreateColis(user: User, colis: Colis): Observable<string> {
    //     return this.colisService.create(colis).pipe(
    //         switchMap((createdColis: Colis) => {
    //             user.colis = createdColis.id; // Assuming the Colis entity has an "id" field
    //             return from(this.jwtService.signAsync({ user }));
    //         })
    //     );
    // }

    generateJWT(user: User): Observable<string>{
        return from(this.jwtService.signAsync({user})); 
    }

    hashPassword(password: string): Observable<string>{
        return from<string>(bcrypt.hash(password, 12));
    }

    // comparePasswords(newPassword: string, passwortHash:string): Observable<any>{
    //     return from(bcrypt.compare(newPassword, passwortHash));
 
    // } 
    comparePasswords(newPassword: string, passwordHash: string): Observable<any | boolean> {
        return of <any|boolean> (bcrypt.compare(newPassword, passwordHash));
      }
} 
 