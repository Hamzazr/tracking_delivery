import { Transporteur } from "src/transporteur/models/trans.interface";
import { User } from "src/user/models/user.interface";
import { Recipient } from "src/recipient/model/recipient.interface";
import { UserEntity } from "src/user/models/user.entity";

export interface Colis {

    id_colis?: number;

    suivi_numero?: number;

    statut?: string;

    description?: string;

    emplacement?: string;

    transporteur?: Transporteur;

    recipient?: Recipient;

    sender?: User;
} 