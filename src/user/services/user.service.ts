import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
import { Observable, from, throwError, of } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';
import { switchMap, map, catchError} from 'rxjs/operators';
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private authService: AuthService

    ){}
 
    login(user: User): Observable<string> {
      return this.validateUser(user.email, user.password).pipe(
          switchMap((user: User) => {
              if(user) {
                  return this.authService.generateJWT(user).pipe(
                    map((jwt: string) => jwt)
                    );
              } else { 
                  return of('Wrong Credentials');
              }
          })
      ) 
  }

    create(user: User): Observable<User>{
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity();
                newUser.first_name = user.first_name; 
                newUser.last_name = user.last_name; 
                newUser.adresse = user.adresse;
                newUser.country = user.country;
                newUser.ville = user.ville;
                newUser.email = user.email;
                newUser.password = passwordHash; 

                return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const {password, ...result} = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                )
            }
        )
        //return from(this.userRepository.save(user));
    )}


    findOne(id: number): Observable<User> {

        const options: FindOneOptions<UserEntity> = {
          where: { id },
          relations: ['colis']
        };
      
        return from(this.userRepository.findOne(options)).pipe(
          map((user: User) => {
            const { password, ...result } = user;
            return result;
          })
        );
      }

    findAll(): Observable<User[]> {
      return from(this.userRepository.find()).pipe(
        map((users: User[]) => {
            users.forEach(function (v) {delete v.password});
            return users;
        })
    );
    }

    paginate(options: IPaginationOptions): Observable<Pagination<User>> {
      return from(paginate<User>(this.userRepository, options)).pipe(
          map((usersPageable: Pagination<User>) => {
              usersPageable.items.forEach(function (v) {delete v.password});
              return usersPageable;
          })  
      )
    }

    deleteOne(id: number): Observable<any> {
        return from(this.userRepository.delete(id));
    }

    

    validateUser(email: string, password: string): Observable<User> {

      return from(
        this.userRepository.findOne({
          where: { email },
          select: ['id', 'first_name', 'last_name', 'adresse', 'country', 'ville', 'email', 'password'],
        })
      ).pipe(
        switchMap((user: User) => {
          if (user) {
            return this.authService.comparePasswords(password, user.password).pipe(
              map((match: boolean) => {
                if (match) {
                  const { password, ...result } = user;
                  return result;
                } else {
                  throw Error('Wrong Credentials'); // Handle incorrect password
                }
              })
            );
          } else {
            throw Error('User not found'); // Handle user not found
          }
        })
      );


        //   return from(
        //     this.userRepository.findOne({
        //       where : {email},  
        //       select: ['id', 'first_name', 'last_name', 'adresse', 'ville', 'email', 'password'] 
        //     })).pipe(
        //     switchMap((user: User) => this.authService.comparePasswords(password, user.password).pipe(
        //       map((match: boolean) => {
        //         if(match) {
        //             const {password, ...result} = user;
        //             return result;
        //         } else {
        //             throw Error('Wrong Credentials');
        //         }
        //     })
        // ))
        // )




        // return from(this.userRepository.findOne({ where: { email } })).pipe(
          //   switchMap((user: User) => {
          //     if (!user) {
          //       throw new Error('User not found');
          //     }
        
          //     return this.authService.comparePasswords(password, user.password).pipe(
          //       map((match: boolean) => {
          //         if (match) {
          //           const { password, ...result } = user;
          //           return result;
          //         } else {
          //           throw new Error('Invalid password');
          //         }
          //       })
          //     );
          //   }),
          //   catchError((error) => {
          //     throw new InternalServerErrorException('Database error occurred', error.message);
          //   })
          // );

    }

    findOneByEmail(email: string): Observable<User> {
        const options: FindOneOptions<UserEntity> = {
          where: { email },
        };
      
        return from(this.userRepository.findOne(options)).pipe(
          map((user: User) => {
            const { password, ...result } = user;
            return result;
          })
        );
      }

    updateOne(id: number, user: UserEntity): Observable<any> {
      delete user.email;
      delete user.password;

      return from(this.userRepository.update(id, user)).pipe(
          switchMap(() => this.findOne(id))
      );
  }

}
