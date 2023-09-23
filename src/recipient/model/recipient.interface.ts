import { Colis } from "src/colis/models/colis.interface";

export interface Recipient{
 
    id_recipient?: number;

    first_name?: string;

    last_name?: string;

    email?: string;

    phone?: string;

    country?: string;

    colis?: Colis[];

    
}