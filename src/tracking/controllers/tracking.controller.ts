import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ServiceTracking } from '../services/Tracking.service'
import { Observable } from 'rxjs';
import { Console } from 'console';
import { TrackingRequest } from '../models/trackingrequest.model';

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

  @Post('auth')
  async authApi(@Body() formData: Record<string, any>){
    try {
      console.log('Received form data:', formData);

      // Process the form data and return a response
      return { message: 'Form data received successfully', data: formData };
    } catch (error) {
      // Handle errors
      console.error('Error:', error.message);
      throw new Error('Form data submission failed');
  }}

  @Post('track-shipment')
  async trackShipment(@Body() trackingNumbers: TrackingRequest) {
    try {
      console.debug(trackingNumbers);
      const shipmentStatus = await this.trackingService.trackShipment(trackingNumbers);
      return { status: 'success', data: shipmentStatus };
    } catch (error) {
      console.error(error)
      return { status: 'error', message: 'Failed to retrieve shipment status' };
    }
  }

    
    
} 
 