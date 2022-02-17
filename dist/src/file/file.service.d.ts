import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";
import { FileUpload, s3Input, S3Params } from "@src/file/input/file.input";
export declare class FileService {
    private readonly configService;
    private s3;
    constructor(configService: ConfigService);
    upsertImage(data: FileUpload): Promise<void>;
    upsertContent(content: string, filename: string): Promise<void>;
    uploadToS3(data: Partial<S3Params>): Promise<S3.ManagedUpload.SendData>;
    getS3Data(data: s3Input): Promise<{
        hashId: string;
        data: string;
    }>;
}
