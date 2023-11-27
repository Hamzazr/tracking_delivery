import { ColisEntity } from "src/colis/models/colis.entity";
import { TrackingEntity } from "src/tracking/models/tracking.entity";

export interface ColisNotification{

    idNotification: number;
    senderContactName: string;
    senderContactEmail: string;
    notifyOnDelivery: boolean;
    notifyOnEstimatedDeliveryDateChange: boolean;
    notifyOnException: boolean;
    notifyOnTendered: boolean;
    currentResult: boolean;
    colis: ColisEntity;

}