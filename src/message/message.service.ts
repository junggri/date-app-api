import {Injectable} from "@nestjs/common";
import {MessageInput} from "@src/message/input/message.input";
import {InjectRepository} from "@nestjs/typeorm";
import {Message, Post} from "@src/entities";
import {Repository} from "typeorm";
import {ExternalService} from "@src/externalApi/external.service";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    private readonly externalApi: ExternalService
  ) {
  }

  async createMessage(data: MessageInput) {
    await this.messageRepository
      .createQueryBuilder('message')
      .insert()
      .into(Message)
      .values({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        content: data.content
      })
      .execute()

    const smsData = {
      name: data.name,
      content: data.content
    };

    await this.externalApi.sendSMS(smsData);

    return "created";
  }

  async getMessage(){
    return await this.messageRepository
      .createQueryBuilder("message")
      .getMany()
  }
}