import { Place } from "@src/entities";
import { Repository } from "typeorm";
export declare class PlaceService {
    private placeRepository;
    constructor(placeRepository: Repository<Place>);
}
