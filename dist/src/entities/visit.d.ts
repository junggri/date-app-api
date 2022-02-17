import { Base } from "@src/entities/BaseEntity";
export declare class Visit extends Base {
    identifier: string;
    country: string;
    city: string;
    regionName: string;
    regionAddress: string;
    count: number;
}
