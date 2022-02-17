import { Reply } from "@src/entities";
import { Repository } from "typeorm";
import { ReplyCreateInput, ReplyDeleteInput, ReplyInput } from "@src/reply/input/reply.input";
import { HashidsService } from "@src/hashids/hashids.service";
import { ExternalService } from "@src/externalApi/external.service";
export declare class ReplyService {
    private replyRepository;
    private readonly hashIdService;
    private readonly externalApi;
    constructor(replyRepository: Repository<Reply>, hashIdService: HashidsService, externalApi: ExternalService);
    getReply(data: ReplyInput): Promise<Reply[]>;
    upsertReply(data: ReplyCreateInput): Promise<Reply>;
    deleteReply(data: ReplyDeleteInput): Promise<void>;
}
