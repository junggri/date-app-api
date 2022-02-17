import { Repository } from "typeorm";
import { User } from "@src/entities/user";
import { EncryptService } from "@src/encrypt/encrpyt.service";
import { ConfigService } from "@nestjs/config";
export declare class UserService {
    private userRepository;
    private readonly encryptService;
    private readonly configService;
    constructor(userRepository: Repository<User>, encryptService: EncryptService, configService: ConfigService);
    findUser(username: string): Promise<User>;
    onApplicationBootstrap(): Promise<void>;
}
