import { Attendance } from "@src/entities";
import { Repository } from "typeorm";
export declare class AttendanceService {
    private postRepository;
    constructor(postRepository: Repository<Attendance>);
}
