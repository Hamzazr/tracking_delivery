

class TrackingNumberInfo {
    trackingNumber: string;
    carrierCode: string;
    trackingNumberUniqueId: string;
  }
  
  class TrackingInfo {
    trackingNumberInfo: TrackingNumberInfo;
    shipDateBegin: string;
    shipDateEnd: string;
  }
  
  export class TrackingRequest {
    includeDetailedScans: boolean;
    trackingInfo: TrackingInfo[];
  }