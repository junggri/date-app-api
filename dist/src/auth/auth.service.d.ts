import { UserService } from "@src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserInput } from "@src/user/input/user.input";
import { EncryptService } from "@src/encrypt/encrpyt.service";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly encryptService;
    constructor(userService: UserService, jwtService: JwtService, encryptService: EncryptService);
    validationUser(data: UserInput): Promise<true>;
    login(data: UserInput): Promise<{
        access_token: string;
    }>;
}
