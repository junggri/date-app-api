import { Register } from "@src/entities/Register";
import { Repository } from "typeorm";
export declare class RegisterService {
    private registerRepository;
    constructor(registerRepository: Repository<Register>);
}
