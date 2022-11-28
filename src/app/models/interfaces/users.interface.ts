import { GRUMPI } from "../grumpi.model";

export interface Users {
    name?: string;
    lastName?: string;
    email?: string;
    password?: string;
    bag?: [];
    creatures?: GRUMPI[];
}