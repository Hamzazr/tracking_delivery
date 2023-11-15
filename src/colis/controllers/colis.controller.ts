import { Body, Controller, Post, Query, UseGuards, Get, Param, Request,  Req, Delete, Put } from '@nestjs/common';
import { ColisService } from '../services/colis.service';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { User } from 'src/user/models/user.interface';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Transporteur } from 'src/transporteur/models/trans.interface';
import { Colis } from '../models/colis.interface';
import { UserIsClientGuard } from '../guards/user-is-client.guard';
import { ColisEntity } from '../models/colis.entity';



@Controller('colis')
export class ColisController {

    constructor(private colisService: ColisService) {}
//  ------------------------------------------------------------
    @UseGuards(JwtAuthGuard) 
    @Post()
    create(@Body()colis: ColisEntity, @Request() req ): Observable<Colis> {
        
        const user = req.user;

        return this.colisService.create(user, colis);
    }
    
//  ------------------------------------------------------------
  
    // @Get()
    // findColis(@Query('userId') userId: number): Observable<Colis[]>{
    //     if(userId == null) {
    //         return this.colisService.findAll();
    //     } else {
    //         return this.colisService.findByUser(userId);
    //     }
    // }
//  ------------------------------------------------------------
    @Get(':id')
    findOne(@Param('id') id: number): Observable<Colis> {
        return this.colisService.findOne(id);
    }
    
    @Get()
    index(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Observable<Pagination<Colis>> {
        limit = limit > 100 ? 100 : limit; 
            return this.colisService.paginateAll({ page: Number(page), limit: Number(limit), route: 'http://localhost:3000/api/colis' });
    }

    @UseGuards(JwtAuthGuard, UserIsClientGuard)
    @Put(':id')
    updateOne(@Param('id') id: number, @Body() colis: ColisEntity): Observable<Colis> {
        return this.colisService.updateOne(Number(id), colis);
    }
//  ------------------------------------------------------------
    @UseGuards(JwtAuthGuard, UserIsClientGuard)
    @Delete(':id')
    deleteOne(@Param('id') id: number): Observable<any> {
        return this.colisService.deleteOne(id);
    }

} 
