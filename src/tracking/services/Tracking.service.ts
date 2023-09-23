import { Injectable } from '@nestjs/common';
import axios from 'axios'
import { Observable, catchError, throwError } from 'rxjs';

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

  //----------------------------------------------------New


  private readonly myapi1 = 'l7bfea77bc57c942ec915617cfc67456fd';
  private readonly trackingApiBaseUrl3 =  'https://apis-sandbox.fedex.com/track/v1/trackingnumbers';

    async trackShipment(trackingNumbers: string[]) {
    try {
      const data = {
        trackingNumbers: trackingNumbers,
      };


      const response = await axios.post(
        'https://apis-sandbox.fedex.com/track/v1/trackingnumbers',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-locale': 'en_US',
            Authorization: `Bearer ${this.myapi1}`, 
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
    
}
