import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {MessageService} from "@src/message/message.service";
import {MessageInput} from "@src/message/input/message.input";
import {Message} from "@src/entities";

@Resolver()
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService
  ) {
  }

  @Mutation(() => String)
  async createMessage(@Args("data") data: MessageInput) {
    return await this.messageService.createMessage(data)
  }


  @Query(()=>[Message],)
  async getMessage(){
    return await this.messageService.getMessage()
  }
}