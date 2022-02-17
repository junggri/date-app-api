import { ConfigService } from "@nestjs/config";
import { YoutubeInput } from "@src/entities/Youtube";
export declare class GoogleService {
    private readonly configService;
    constructor(configService: ConfigService);
    getVisitor(): Promise<unknown>;
    getVideos(input: YoutubeInput): Promise<{
        nextPageToken: any;
        data: string;
    }>;
}
