export declare class ReplyInput {
    hashId: string;
}
export declare class ReplyCreateInput {
    hashId: string;
    postTitle: string;
    replyHashId?: string;
    comment: string;
    writer: string;
    parentId?: number;
}
export declare class ReplyDeleteInput {
    replyIds: [number];
    hashId: string;
}
