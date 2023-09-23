import { Colis } from "src/colis/models/colis.interface";
import { TrackingEntity } from "src/tracking/models/tracking.entity";


export interface User {
    id?: number;

    first_name?: string;

    last_name?: string;

    adresse?: string;

    country?: string;

    ville?: string;

    email?: string;

    password?: string;

    colis?: Colis[];
    
   //shipment?: TrackingEntity[];

}
