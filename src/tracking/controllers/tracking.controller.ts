import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ServiceTracking } from '../services/Tracking.service'
import { Observable } from 'rxjs';

@Controller('tracking')
export class ControllerTracking {

    constructor( private readonly trackingService: ServiceTracking ){}

    @Get('track/:trackerId/results')
    async trackColis(@Param('trackerId') trackerId: string): Promise<any> {
        return this.trackingService.trackColis(trackerId);
    }

    @Post('create')
    async createTracking() : Promise<any> {
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
  async trackShipment(@Body() trackingNumbers: string[]) {
    try {
      const shipmentStatus = await this.trackingService.trackShipment(trackingNumbers);
      return { status: 'success', data: shipmentStatus };
    } catch (error) {
      return { status: 'error', message: 'Failed to retrieve shipment status' };
    }
  }

    
    
} 
 