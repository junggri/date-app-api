import { FileService } from "@src/file/file.service";
import { s3Input } from "@src/file/input/file.input";
export declare class FileResolver {
    private readonly fileService;
    constructor(fileService: FileService);
    getS3Image(data: s3Input): Promise<{
        hashId: string;
        data: string;
    }>;
}
