import { Base } from "@src/entities/BaseEntity";
import { Place } from "@src/entities/Place";
import { Picture } from "@src/entities/Picture";
export declare class Record extends Base {
    who: string;
    url: string;
    description: string;
    place: Place;
    picture: [Picture];
}
