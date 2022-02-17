import { MessageInput } from "@src/message/input/message.input";
import { Message } from "@src/entities";
import { Repository } from "typeorm";
import { ExternalService } from "@src/externalApi/external.service";
export declare class MessageService {
    private messageRepository;
    private readonly externalApi;
    constructor(messageRepository: Repository<Message>, externalApi: ExternalService);
    createMessage(data: MessageInput): Promise<string>;
    getMessage(): Promise<Message[]>;
}
