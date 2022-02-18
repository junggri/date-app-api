import {Module} from "@nestjs/common";
import {RegisterService} from "@src/Register/Register.service";
import {RegisterResolver} from "@src/Register/Register.resolver";
import {Register} from "@src/entities";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Register])],
  providers: [
    RegisterService,
    RegisterResolver
  ],
  exports: [],
})

export class RegisterModule {

}
