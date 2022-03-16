import { Base } from "./BaseEntity";
import { Place } from "@src/entities/Place";
export declare class User extends Base {
    name: string;
    userImage: string;
    birthDay: Date;
    phoneNumber: string;
    place: [Place];
}
