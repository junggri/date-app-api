import { Record } from "@src/entities";
import { Repository } from "typeorm";
export declare class RecordService {
    private recordRepository;
    constructor(recordRepository: Repository<Record>);
}
