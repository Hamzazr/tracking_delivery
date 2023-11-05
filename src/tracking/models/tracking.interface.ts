import { TrackingEvent } from "./event.interface";
import { PackageDetails } from "./packagedetail.interface";

export interface Tracking {
    idTracking: number;
    trackingNumber: string;
    shipperAddress: string;
    recipientAddress: string;
    shippingDate: string;
    actualDelivery: string;
    standardTransitTimeWindow: string;
    packageDetails: PackageDetails
    events: TrackingEvent[];

}