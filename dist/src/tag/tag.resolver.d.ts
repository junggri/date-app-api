import { TagService } from "@src/tag/tag.service";
import { TagDeleteInput, TagInput } from "@src/tag/input/tag.input";
import { Tag } from "@src/entities";
export declare class TagResolver {
    private readonly tagService;
    constructor(tagService: TagService);
    getTags(): Promise<Tag[]>;
    upsertTag(data: TagInput): Promise<Tag | "exist already">;
    deleteTag(data: TagDeleteInput): Promise<number>;
}
