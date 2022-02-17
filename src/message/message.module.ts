import {Module} from "@nestjs/common";
import {MessageResolver} from "@src/message/message.resolver";
import {MessageService} from "@src/message/message.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Message} from "@src/entities";
import {ExternalModule} from "@src/externalApi/external.module";


@Module({
  imports: [TypeOrmModule.forFeature([Message]), ExternalModule],
  providers: [MessageResolver, MessageService],
  exports: []
})

export class MessageModule {

}