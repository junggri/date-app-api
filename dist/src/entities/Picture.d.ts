import { Base } from "./BaseEntity";
import { Record } from "@src/entities/Record";
export declare class Picture extends Base {
    who: string;
    url: string;
    record: Record;
}
