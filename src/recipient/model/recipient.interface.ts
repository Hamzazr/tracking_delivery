import { Colis } from "src/colis/models/colis.interface";

export interface Recipient{
 
    idRecipient?: number;

    name?: string;

    phone?: string;

    email?: string;

    codePostal?: string;

}