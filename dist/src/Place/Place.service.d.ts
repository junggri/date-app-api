import { Place } from "@src/entities";
import { Repository } from "typeorm";
import { UserService } from "@src/User/user.service";
import { PlaceInput } from "@src/Place/input/place.input";
export declare class PlaceService {
    private placeRepository;
    private readonly userService;
    constructor(placeRepository: Repository<Place>, userService: UserService);
    getPlace(): Promise<Place[]>;
    createPlace(data: PlaceInput): Promise<string>;
    onApplicationBootstrap(): Promise<void>;
}
