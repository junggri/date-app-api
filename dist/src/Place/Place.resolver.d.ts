import { PlaceService } from "@src/Place/Place.service";
import { PlaceInput } from "@src/Place/input/place.input";
import { Place } from "@src/entities";
export declare class PlaceResolver {
    private readonly placeService;
    constructor(placeService: PlaceService);
    ping(): string;
    getPlace(): Promise<Place[]>;
    insertPlace(data: PlaceInput): Promise<string>;
}
