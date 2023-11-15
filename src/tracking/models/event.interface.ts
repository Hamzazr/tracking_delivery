import { Tracking } from "./tracking.interface";

export interface TrackingEvent {
    id: number;
    date: string;
    eventType: string;
    eventDescription: string; 
    exceptionCode: string;
    exceptionDescription: string;
  
    scanLocation: {
      streetLines: string[];
      city: string;
      stateOrProvinceCode: string;
      postalCode: string;
      countryCode: string;
      residential: boolean;
      countryName: string;
    };
    locationId: string;
    locationType: string;
    derivedStatusCode: string;
    derivedStatus: string;
    tracking : Tracking;
  }
  