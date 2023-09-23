import { Body, Controller, Post, Get, Param, Query, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Observable,  from, throwError, of } from 'rxjs';
import { User } from '../models/user.interface';
import { switchMap, map, catchError} from 'rxjs/operators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { UserIsUserGuard } from 'src/auth/guards/UserIsUser.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { UserEntity } from '../models/user.entity';


@Controller('users')
export class UserController {

    constructor(private userService: UserService) {

    }
    
    @Post('register')
    create(@Body() user : User): Observable<User | Object> {
         return this.userService.create(user).pipe(
            map((user: User) => user),
            catchError(err => of({error: err.message})) 
        );
    }
    
    @Post('login')
    login(@Body() user: User): Observable<Object>{
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { access_token: jwt };
            })
        )
    }

    
    @Get(':id')
    findOne(@Param() params): Observable<User> {
        return this.userService.findOne(params.id);
    }

    //@UseGuards(JwtAuthGuard, UserIsUserGuard)
    @Get()
    index(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ): Observable<Pagination<User>> {
        limit = limit > 100 ? 100 : limit; 
            return this.userService.paginate({ page: Number(page), limit: Number(limit), route: 'http://localhost:3000/api/users' });
    }
 

    //@UseGuards(JwtAuthGuard, UserIsUserGuard)
    @Put(':id')
    updateOne(@Param('id') id: string, @Body() user : UserEntity): Observable<any> {
        return this.userService.updateOne(Number(id), user);
    }


    //@UseGuards(JwtAuthGuard, UserIsUserGuard)
    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<any> {
        return this.userService.deleteOne(Number(id));
    }
    
} 
 