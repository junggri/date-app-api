import { ConfigService } from "@nestjs/config";
export declare class EncryptService {
    private configService;
    constructor(configService: ConfigService);
    getHash(): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
}
