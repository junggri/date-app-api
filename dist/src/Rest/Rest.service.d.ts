import { Repository } from "typeorm";
import { Rest } from "@src/entities/Rest";
export declare class RestService {
    private restRepository;
    constructor(restRepository: Repository<Rest>);
}
