import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ServiceTracking } from '../services/Tracking.service'
import { Observable } from 'rxjs';
import { Console } from 'console';
import { TrackingRequest } from '../models/trackingrequest.model';
import { TrackResult } from '../models/tracking.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { ColisEntity } from 'src/colis/models/colis.entity';
import { Colis } from 'src/colis/models/colis.interface';
import { TrackingEntity } from '../models/tracking.entity';
import { Tracking } from '../models/tracking.interface';

@Controller('tracking')
export class ControllerTracking {

  constructor(private readonly trackingService: ServiceTracking) { }

  
  @Post()
  create(@Body()tracking: TrackingEntity, @Request() req ): Observable<Tracking> {
      return this.trackingService.create(tracking);
  }



  @Get('track/:trackerId/results')
  async trackColis(@Param('trackerId') trackerId: string): Promise<any> {
    return this.trackingService.trackColis(trackerId);
  }

  @Post('create')
  async createTracking(): Promise<any> {
    try {
      const response = await this.trackingService.createTracking();
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.status, error.response?.data);
      throw new HttpException('Failed to create tracking', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //   @Get('country')
  //   async getAllCountries() { 
  //     const countries = await this.trackingService.getAllCountries();
  //     return countries;
  // }


  @Post('track-shipment')
  async trackShipment(@Body() trackingNumbers: TrackingRequest) {
    try {
      console.debug(trackingNumbers);
      const shipmentStatus = await this.trackingService.trackShipment(trackingNumbers);
      console.log(shipmentStatus)

      return { status: 'success', data: shipmentStatus };

    } catch (error) {
      console.log(error)
      return { status: 'error', data: null };
    }
  }

  // @Post()
  // async trackShipment2(@Body(new ValidationPipe()) trackingNumbers: TrackingRequest): Promise<{ status: string, data: TrackResult }> {
  //   try {
  //     const shipmentStatus = await this.trackingService.trackShipment(trackingNumbers);
  //     return { status: 'success', data: shipmentStatus };
  //   } catch (error) {
  //     return { status: 'error', message: 'Failed to retrieve shipment status2');
  //      };
  //   }
  // }




}
