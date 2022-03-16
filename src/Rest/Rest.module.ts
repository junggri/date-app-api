import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Rest} from "@src/entities/Rest";
import {RestResolver} from "@src/Rest/Rest.resolver";
import {RestService} from "@src/Rest/Rest.service";

@Module({
  imports: [TypeOrmModule.forFeature([Rest])],
  providers: [
    RestResolver,
    RestService
  ],
  exports: []
})

export class RestModule {

}
