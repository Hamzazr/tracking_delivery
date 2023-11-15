import { Injectable } from '@nestjs/common';
import axios from 'axios'
import { Observable, catchError, throwError } from 'rxjs';
import { TrackingRequest } from '../models/trackingrequest.model';
import { LatestStatusDetail, RecipientInformation, TrackResult, Event, Address, ShipperInformation, PackageDetails, ScanLocation, PackagingDescription, WeightAndDimensions, ScanLocation_, Weight, Dimension } from '../models/tracking.dto';
import { response } from 'express';

@Injectable()
export class ServiceTracking {

  private readonly trackingApiBaseUrl = 'https://api.ship24.com/public/v1/trackers/search';
  private readonly trackingApiBaseUrl2 = 'https://api.ship24.com/public/v1/trackers/track';
  
  
  private readonly apiKey = 'apik_87txZ4aJ4bVGPDB3OOxwtVZnRinSko';
  //private readonly apiKey2 = 'apik_L0DrgEZRznI9uKDn9XS54VYoj1c9Pm';

  async trackColis(trackerId: string): Promise<any> {
    const url = `${this.trackingApiBaseUrl}/${trackerId}/results`;

    try {
      const response = await axios.get(url, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });
      return response.data;
    } catch (error) {
      
      console.error('API Error:', error.response?.status, error.response?.data);
      throw new Error('Failed to fetch container tracking information');
     }
  }

  async createTracking(): Promise<any> {
    const url = this.trackingApiBaseUrl2;

    const requestData = {
      "trackingNumber": "S24DEMO456555",
      "shipmentReference": "c6e4fef4-a816-b68f-4024-3b7e4c5a9f87",
      "originCountryCode": "QA",
      "destinationCountryCode": "MA",
      "destinationPostCode": "40000",
      "shippingDate": "2023-03-01T11:09:00.000Z",
      "courierCode": ["us-post"],
      "courierName": "USPS Standard",
      "trackingUrl": "https://tools.usps.com/go/TrackConfirmAction?tLabels=S24DEMO456444",
      "orderNumber": "DF14R2027",
      "title": "Shirt Nike",
      "statusMilestone": "delivered",
      "recipient": {
        "email": "recipient@email.com",
        "name": "Marc"
      },
      "events": {
        "eventId": "67a64a66-c0cd-429c-a00b-4a30499fd997",
        "status": "ENTREGADO. Su envío está entregado.",
        "occurrenceDatetime": "2023-01-09T15:11:00",
      },

    };

    try{
    const response = await axios.post(url, requestData, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${this.apiKey}`
      },
    });
      return response.data;

    } catch (error) {
      console.error('API Error:', error.response?.status, error.response?.data);
      throw new Error('Failed to create tracking');
    }
       
       
  }

  async authToken(){
      const formData = new URLSearchParams();
      formData.append('grant_type', 'client_credentials');
      formData.append('client_id', 'l7bfea77bc57c942ec915617cfc67456fd');
      formData.append('client_secret', '95a03e4e16e649de9d3be8e468a992a4');
  
      try {
        const response = await axios.post('https://apis-sandbox.fedex.com/oauth/token', formData, {
          
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        })
        console.log('Response:', response.data);
        return response.data ["access_token"] ;
    }catch(error){
      console.error('Error:', error.message);
      return "";
    }
  }

  async trackShipment(trackingNumbers: TrackingRequest) : Promise<TrackResult> {
    try {

      const datatoken = await this.authToken();
      const response = await axios.post(
        'https://apis-sandbox.fedex.com/track/v1/trackingnumbers',
        trackingNumbers,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-locale': 'en_US',
            Authorization: `Bearer ${datatoken}`
          },
        }
      );
      
      const output = response.data.output;
      const completeTrackResults = output.completeTrackResults;
      const completeTrackResult = completeTrackResults[0];
      const trackResults = completeTrackResult.trackResults;
      const firstResult = trackResults[0];
      const events : Event[] = firstResult.scanEvents;
     


      const packageDetails = firstResult.packageDetails;
      const count = packageDetails.count;
      const weightAndDimensions = packageDetails.weightAndDimensions;
      const weights : Weight[] = weightAndDimensions.weight;
      const dimensions  : Dimension[] = weightAndDimensions.dimensions;

      //console.log(events[0].date);

      const shipDate = events.find(event => event.eventType == "PU").date;
      const actualDelivery = events.find(event => event.eventType == "HP").date;
      const standardTransitTimeWindow = firstResult.standardTransitTimeWindow.window.ends;

      const pd : PackageDetails = {
        count: count,
        weight: weights.find(w => w.unit == "KG"),
        dimension: dimensions.find(w => w.units == "CM"),
        packaging: packageDetails.packagingDescription.description
      }

      const recipientInformation = firstResult.recipientInformation;
      const shipperInformation = firstResult.shipperInformation;


      const trackResult : TrackResult = {
        trackingNumber: completeTrackResult.trackingNumber,
        packageDetails: pd, 
        shipDate: shipDate,
        actualDelivery: actualDelivery,
        standardTransitTimeWindow: standardTransitTimeWindow,
        recipient: recipientInformation,
        shipper: shipperInformation,
        events: events,
      };

      // Initialize a variable to store the last event
      // let lastEvent: Event | null = null;

      // // Loop through the events to find the last event 
      // for (const event of events) {
      //   if (!lastEvent || event.date < lastEvent.date) {
      //     lastEvent = event;
      //   }
      // }

      // // Now, you have the last event in the 'lastEvent' variable
      // console.log('Last Event:', lastEvent);


      return trackResult;


    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  }

  
  

  
    
}
