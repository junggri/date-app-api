import { Base } from "@src/entities/BaseEntity";
import { Place } from "@src/entities/Place";
export declare class Register extends Base {
    who: string;
    address: string;
    date: Date;
    description: string;
    place: Place[];
}
