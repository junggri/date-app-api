import { AuthService } from "@src/auth/auth.service";
import { UserInput } from "@src/user/input/user.input";
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(data: UserInput): Promise<{
        access_token: string;
    }>;
}
