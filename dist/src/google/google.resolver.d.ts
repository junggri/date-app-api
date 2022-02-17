import { GoogleService } from "@src/google/google.service";
import { YoutubeInput } from "@src/entities/Youtube";
export declare class GoogleResolver {
    private readonly googleService;
    constructor(googleService: GoogleService);
    getVisitor(): Promise<{
        totalsForAllResults: {
            user: any;
            session: any;
        };
        rows: any;
    }>;
    getVideos(data: YoutubeInput): Promise<{
        nextPageToken: any;
        data: string;
    }>;
}
