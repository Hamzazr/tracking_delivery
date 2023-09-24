import { Injectable } from '@nestjs/common';
import axios from 'axios'
import { Observable, catchError, throwError } from 'rxjs';
import { TrackingRequest } from '../models/trackingrequest.model';

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
        console.log("###", response.data ["access_token"]);
        return response.data ["access_token"] ;
    }catch(error){
      console.error('Error:', error.message);
      return "";
    }
  }

  //----------------------------------------------------New


  private readonly token1 = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJDWFMtVFAiXSwiUGF5bG9hZCI6eyJjbGllbnRJZGVudGl0eSI6eyJjbGllbnRLZXkiOiJsN2JmZWE3N2JjNTdjOTQyZWM5MTU2MTdjZmM2NzQ1NmZkIn0sImF1dGhlbnRpY2F0aW9uUmVhbG0iOiJDTUFDIiwiYWRkaXRpb25hbElkZW50aXR5Ijp7InRpbWVTdGFtcCI6IjI0LVNlcC0yMDIzIDA2OjM0OjA1IEVTVCIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJhcGltb2RlIjoiU2FuZGJveCIsImN4c0lzcyI6Imh0dHBzOi8vY3hzYXV0aHNlcnZlci1zdGFnaW5nLmFwcC5wYWFzLmZlZGV4LmNvbS90b2tlbi9vYXV0aDIifSwicGVyc29uYVR5cGUiOiJEaXJlY3RJbnRlZ3JhdG9yX0IyQiJ9LCJleHAiOjE2OTU1NTg4NDUsImp0aSI6IjBmNjViM2QwLTQ1YjEtNDU4NS1iZTlmLWNhNDZkOWVjMzg3ZiJ9.LFcnjopeoiWF-1ddXSNm7UiEWLIf1_vU3lEt3rwoJBYDYF1cqBTZ_itSyCzgYQpCZKCkgqz4TVonGEwzhkhr9vAPhBvtfzEzPlZfnyyUr-kLpRYfATkpPyNNucXd2ML_4PQs4E7MLBnAABodOAAa-2_KAS1mOTe36dwbgzQ4U8a21k-_7RRh8mEHRnKhoDqgYd-66dNRwhsnb7Glv9g-T8zgg0NLdUsl1dIEouvKXvSp-isFm1Y6KbXC-W0M08R7cOLfUOIcsrcaJzW3c_L3dGDs35K7YiJZotXDjeS8NEYnAWzNZ_dwCQHsyEnVLpJkHz47d7f4cSoXYOVubPgdJjAtIycdxkfdzyUn8b8I9Tlfr8iddLOTyDYoy95mkX-dxL6plTLG3zOHwgiMoWLAmTOBaQYF5wEREtpblHJm7QTZc_NsMNHQ8ujtXRz_IYy3MU_eGlAv3Bk9olxfqYLFEjxWRuCihIdDBd7FYsJ2R1Q0gyE5ECEjxU9HtHhiRQmpMRtWF1jUkYnOZRg6xr4NvJLjRlz8G425Zs1pp_fbZ3S3T0LOPvmNG9CLR6JugnUMGdb3jQcvLR_95bmxcsO1Wa9tToGGkLig5GUgWHpJnEEoMDPSDpTSx0d3TCOEeVAebvLirk3FScBViGPq5PB3TtMKZNWa1x9QXJzT1W7kyXg';


    async trackShipment(trackingNumbers: TrackingRequest) {
    try {
    
      const datatoken = await this.authToken();
      console.log( "kazzoun",datatoken);
      const response = await axios.post(
        'https://apis-sandbox.fedex.com/track/v1/trackingnumbers',
        trackingNumbers,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-locale': 'en_US',
            Authorization: `Bearer ${datatoken}`, 
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
    
}
