import { Hit } from "@src/entities/Hit";
import { Base } from './BaseEntity';
import { Reply } from "@src/entities/Reply";
import { Tag } from "@src/entities/Tag";
import { Likes } from "@src/entities/Likes";
export declare class Post extends Base {
    title: string;
    desc: string;
    content?: string;
    originalContent?: string;
    thumbnail?: string;
    open: boolean;
    isPublished: boolean;
    hit?: Hit[];
    hitId: number[];
    reply?: Reply[];
    replyId: number[];
    tagId: number[];
    tag: Tag[];
    likeId: number[];
    likes: Likes[];
}
export declare class HashIds {
    hashIds: string[];
}
