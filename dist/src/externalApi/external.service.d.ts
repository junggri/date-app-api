import { ConfigService } from "@nestjs/config";
import { VisitInput } from "@src/visit/input/visit.input";
interface SMS {
    name: string;
    content: string;
    title?: string;
}
export declare class ExternalService {
    private configService;
    constructor(configService: ConfigService);
    reverseGeolocation(data: VisitInput): Promise<any>;
    sendSMS(data: SMS): Promise<void>;
}
export {};
