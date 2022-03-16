import { Base } from "@src/entities/BaseEntity";
import { Register } from "@src/entities/Register";
import { Record } from "@src/entities/Record";
import { User } from "@src/entities/User";
export declare class Place extends Base {
    buildingName: string;
    roadAddress: string;
    latitude: number;
    longitude: number;
    register: Register;
    record: Record;
    user: User;
}
