import { ReplyService } from "@src/reply/reply.service";
import { Reply } from "@src/entities";
import { ReplyCreateInput, ReplyDeleteInput, ReplyInput } from "@src/reply/input/reply.input";
export declare class ReplyResolver {
    private readonly replyService;
    constructor(replyService: ReplyService);
    getReply(data: ReplyInput): Promise<Reply[]>;
    upsertReply(data: ReplyCreateInput): Promise<Reply>;
    deleteReply(data: ReplyDeleteInput): Promise<void>;
}
