import {Module} from "@nestjs/common";
import {RecordService} from "@src/Record/Record.service";
import {RecordResolver} from "@src/Record/Record.resolver";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Record} from "@src/entities";

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  providers: [RecordService, RecordResolver],
  exports: []
})

export class RecordModule {
}
