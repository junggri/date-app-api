import { Repository } from "typeorm";
import { User } from "@src/entities/User";
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getUser(name: string): Promise<User>;
    onApplicationBootstrap(): Promise<void>;
}
