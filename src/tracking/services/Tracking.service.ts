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
      // const trackResult : TrackResult = {

      //   scanEvents: Array.isArray(response.data.scanEvents)
      //   ? response.data.scanEvents.map((eventData: any) => this.mapEvent(eventData))
      //   : [],
        
      
      //   shipperInfo : this.mapShipperInfo(response.data.shipperInformation) ,
      //   packageDetails : this.mapPackageDetails(response.data.packageDetails) ,
      //   latesStatusDetails : this.mapLatestStatus(response.data.latestStatusDetail) ,
      //   recipientInfo: this.mapRecipientInfo(response.data.recipientInformation) ,
      //   address: response.data.Address ? this.mapAddress(response.data.address) : {} as Address,
      //   scanLocation: response.data.scanLocation ? this.mapScanLocation(response.data.scanLocation) : {} as ScanLocation,
      //   //scanLocationE: response.data.scanLocationE ? this.mapScanLocation(response.data.scanLocationE) : {} as ScanLocation

      // }
      
      // console.log(trackResult)
      // return response.data;


      //console.log('API Response:', response.data);
      const output = response.data.output;
      const completeTrackResults = output.completeTrackResults;
      const completeTrackResult = completeTrackResults[0];
      const trackResults = completeTrackResult.trackResults;
      const firstResult = trackResults[0];


      const Events = firstResult.scanEvents;
      const firstEvent = Events[0];
      const latestD = firstResult.latestStatusDetail;
      const firstLatest = latestD[0];


      const packageDetails = firstResult.packageDetails;
      const count = packageDetails.count;
      const weightAndDimensions = packageDetails.weightAndDimensions
      const weights : Weight[] = weightAndDimensions.weight
      const dimensions  : Dimension[] = weightAndDimensions.dimensions

      const pd : PackageDetails = {
        count: count,
        weight: weights.find(w => w.unit == "KG"),
        dimension: dimensions.find(w => w.units == "CM")
      }

      const trackResult : TrackResult = {
        trackingNumber: completeTrackResult.trackingNumber,
        packageDetails: pd
      };


      return trackResult;
      // if (response.data.status === 'success') {
      //   const completeTrackResults = response.data.data.output.completeTrackResults;
  
      //   // Log the structure of completeTrackResults
      //   console.log('completeTrackResults:', completeTrackResults);
  
      //   if (completeTrackResults && completeTrackResults.length > 0) {
      //     const trackingResultData = completeTrackResults[0];
  
      //     // Log the extracted trackingResultData
      //     console.log('trackingResultData:', trackingResultData);
  
      //     // Access nested data within trackingResultData
      //     const shipperInformation = trackingResultData.shipperInformation;
      //     const recipientInformation = trackingResultData.recipientInformation;
      //     const latestStatusDetail = trackingResultData.latestStatusDetail;
  
      //     // Log specific properties within the nested objects for further analysis
      //     console.log('shipperInformation:', shipperInformation);
      //     console.log('recipientInformation:', recipientInformation);
      //     console.log('latestStatusDetail:', latestStatusDetail);
  
      //     // Now you can map the data to your DTO objects as needed
      //     const trackResult: TrackResult = {
      //       scanEvents: Array.isArray(trackingResultData.scanEvents)
      //         ? trackingResultData.scanEvents.map((eventData: any) => this.mapEvent(eventData))
      //         : [],
      //       shipperInfo: this.mapShipperInfo(shipperInformation),
      //       packageDetails: this.mapPackageDetails(trackingResultData.packageDetails),
      //       latesStatusDetails: this.mapLatestStatus(latestStatusDetail),
      //       recipientInfo: this.mapRecipientInfo(recipientInformation),
      //       address: recipientInformation ? this.mapAddress(recipientInformation.address) : {} as Address,
      //       scanLocation: latestStatusDetail ? this.mapScanLocation(latestStatusDetail.scanLocation) : {} as ScanLocation,
      //     };
   
      //     console.log('Track Result:', trackResult);
      //     return response.data;
      //   } else {
      //     console.error('Error: No completeTrackResults found in the API response.');
      //     throw new Error('No completeTrackResults found in the API response.');
      //   }
      // } else {
      //   // Handle the error response
      //   console.error('Error:', response.data.message);
      //   throw new Error(response.data.message);
      // }


    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  }

  // private mapEvent(eventData: any): Event {
  //   const scanLocation_: ScanLocation = eventData.scanLocation ? this.mapScanLocation(eventData.scanLocation) : {} as ScanLocation;

  //   return {
  //     date: new Date(eventData.date),
  //     eventType: eventData.eventType,
  //     eventDescription: eventData.eventDescription,
  //     exceptionCode: eventData.exceptionCode,
  //     exceptionDescription: eventData.exceptionDescription,
  //     scanLocation: scanLocation_,
  //     locationId: eventData.locationId,
  //     locationType: eventData.locationType,
  //     derivedStatusCode: eventData.derivedStatusCode,
  //     derivedStatus: eventData.derivedStatus,
  //   };
  // }

  // private mapScanLocation(locationData: any): ScanLocation {
  //   if (!locationData) {
  //     // Handle the case where locationData is undefined or null
  //     return {
  //       streetLines: [],
  //       city: '',
  //       stateOrProvinceCode: '',
  //       postalCode: '',
  //       countryCode: '',
  //       residential: false,
  //       countryName: '',
  //     };
  //   }
  
  //   return {
  //     streetLines: locationData.streetLines || [],
  //     city: locationData.city || '',
  //     stateOrProvinceCode: locationData.stateOrProvinceCode || '',
  //     postalCode: locationData.postalCode || '',
  //     countryCode: locationData.countryCode || '',
  //     residential: locationData.residential || false,
  //     countryName: locationData.countryName || '',
  //   };
  // }

  // private mapPackageDetails(packageData: any): PackageDetails {
  //   if (!packageData || !packageData.packagingDescription) {
  //     // If packageData or packagingDescription is undefined, return an empty PackageDetails object
  //     return {
  //       packagingDescription: {} as PackagingDescription,
  //       physicalPackagingType: '',
  //       sequenceNumber: '',
  //       count: '',
  //       weightAndDimensions: {} as WeightAndDimensions,
  //       packageContent: [],
  //     };
  //   }
  
  //   const packagingDescription: PackagingDescription = {
  //     type: packageData.packagingDescription.type,
  //     description: packageData.packagingDescription.description,
  //   };
  
  //   const weightAndDimensions: WeightAndDimensions = {
  //     weight: Array.isArray(packageData.weightAndDimensions?.weight)
  //       ? packageData.weightAndDimensions.weight.map((weightData: any) => ({
  //           value: weightData.value,
  //           unit: weightData.unit,
  //         }))
  //       : [],
  //     dimensions: Array.isArray(packageData.weightAndDimensions?.dimensions)
  //       ? packageData.weightAndDimensions.dimensions.map((dimensionData: any) => ({
  //           length: dimensionData.length,
  //           width: dimensionData.width,
  //           height: dimensionData.height,
  //           units: dimensionData.units,
  //         }))
  //       : [],
  //   };
  
  //   return {
  //     packagingDescription,
  //     physicalPackagingType: packageData.physicalPackagingType || '',
  //     sequenceNumber: packageData.sequenceNumber || '',
  //     count: packageData.count || '',
  //     weightAndDimensions,
  //     packageContent: Array.isArray(packageData.packageContent) ? packageData.packageContent : [],
  //   };
  // }

  // private mapLatestStatus(statusData: any): LatestStatusDetail {

  //   if (!statusData || !statusData.scanLocation) {
  //     // Handle the case where statusData or scanLocation is undefined or null
  //     return {
  //       code: '',
  //       derivedCode: '',
  //       statusByLocale: '',
  //       description: '',
  //       scanLocation: {} as ScanLocation,
  //     };
  //   }

  //   const scanLocation: ScanLocation = statusData.scanLocation ? this.mapScanLocation(statusData.scanLocation) : {} as ScanLocation;

  //   return {
  //     code: statusData.code,
  //     derivedCode: statusData.derivedCode,
  //     statusByLocale: statusData.statusByLocale,
  //     description: statusData.description,
  //     scanLocation: scanLocation,
  //   };
  // }


  // private mapRecipientInfo(recipientData: any): RecipientInformation {
  //   if (!recipientData || !recipientData.address) {
  //     return { address: {} as Address };
  //   }
  //   return {
  //     address: this.mapAddress(recipientData.address),
  //   };
  // }

  // private mapShipperInfo(shipperData: any): ShipperInformation {
  //   if (!shipperData || !shipperData.address) {
  //     return { address: {} as Address };
  //   }
  //   return {
  //     address: this.mapAddress(shipperData.address),
  //   };
  // }

  // private mapAddress(addressData: any): Address {
  //   if (!addressData) {
  //     return {} as Address;
  //   }
  //   return {
  //     city: addressData.city,
  //     stateOrProvinceCode: addressData.stateOrProvinceCode,
  //     countryCode: addressData.countryCode,
  //     residential: addressData.residential,
  //     countryName: addressData.countryName,
  //   };
  // }
  

  
    
}
