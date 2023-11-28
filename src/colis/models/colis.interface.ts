import { Transporteur } from "src/transporteur/models/trans.interface";
import { User } from "src/user/models/user.interface";
import { Recipient } from "src/recipient/model/recipient.interface";
import { UserEntity } from "src/user/models/user.entity";

export interface Colis {

    id_colis: number;
    trackingNumber?: String;
    countryOrigin?: String;
    countryDestination?: String;
    title?: String;
    orderNumber?: String;
    transporteur?: Transporteur;
    recipient?: Recipient;
    user?: User;

} 