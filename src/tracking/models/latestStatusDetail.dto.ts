export class TrackResult{

    trackingNumber: string;
    shipDate: string;
    events: string[]; 
    delivryDate: string;
    // recipientInfo : RecipientInformation;
    // address : Address;
    // shipperInfo : ShipperInformation;
    // scanEvents : Event[];
    // packageDetails : PackageDetails;
    latesStatusDetails : LatestStatusDetail;
    // scanLocation : ScanLocation;
    //scanLocationE : ScanLocation;

}


export class RecipientInformation {
    address: Address;
}

export class ShipperInformation {
    address: Address;
}

export class Address {
    city:                string;
    stateOrProvinceCode: string;
    countryCode:         string;
    residential:         boolean;
    countryName:         string;
}


export class Event {
    date:                 Date;
    eventType:            string;
    eventDescription:     string;
    exceptionCode:        string;
    exceptionDescription: string;
    scanLocation:         ScanLocation;
    locationId:           string;
    locationType:         string;
    derivedStatusCode:    string;
    derivedStatus:        string;
}

export class ScanLocation {
    streetLines:         string[];
    city:                string;
    stateOrProvinceCode: string;
    postalCode:          string;
    countryCode:         string;
    residential:         boolean;
    countryName:         string;
}





export class PackageDetails {
        packagingDescription:  PackagingDescription;
        physicalPackagingType: string;
        sequenceNumber:        string;
        count:                 string;
        weightAndDimensions:   WeightAndDimensions;
        packageContent:        any[];
    }
    
    export class PackagingDescription {
        type:        string;
        description: string;
    }
    
    export class WeightAndDimensions {
        weight:     Weight[];
        dimensions: Dimension[];
    }
    
    export class Dimension {
        length: number;
        width:  number;
        height: number;
        units:  string;
    }
    
    export class Weight {
        value: string;
        unit:  string;
    }


export class LatestStatusDetail {
        code:           string;
        derivedCode:    string;
        statusByLocale: string;
        description:    string;
        scanLocation:   ScanLocation_;
    }
    
export class ScanLocation_ {
        city:                string;
        stateOrProvinceCode: string;
        countryCode:         string;
        residential:         boolean;
        countryName:         string;
    }

export class OriginLocation {
    locationContactAndAddress : LocationContactAndAddress;
}

export class HoldAtLocation { 
    locationContactAndAddress : LocationContactAndAddress;
}

export class LastUpdatedDestination {
    scanLocation : ScanLocation;
}

export class LocationContactAndAddress {
    address : ScanLocation
}



