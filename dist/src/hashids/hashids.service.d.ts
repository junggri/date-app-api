import { ConfigService } from "@nestjs/config";
export declare class HashidsService {
    static instance: HashidsService;
    private hashids;
    constructor(config: ConfigService);
    encode(id: number): string;
    decode(hashId: string): number | undefined;
}
