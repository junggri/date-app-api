import { MessageService } from "@src/message/message.service";
import { MessageInput } from "@src/message/input/message.input";
import { Message } from "@src/entities";
export declare class MessageResolver {
    private readonly messageService;
    constructor(messageService: MessageService);
    createMessage(data: MessageInput): Promise<string>;
    getMessage(): Promise<Message[]>;
}
