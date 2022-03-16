import {Module} from "@nestjs/common";
import {PlaceService} from "@src/Place/Place.service";
import {PlaceResolver} from "@src/Place/Place.resolver";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Place} from "@src/entities";
import {UserModule} from "@src/User/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Place]),
    UserModule
  ],
  providers: [
    PlaceService,
    PlaceResolver
  ],
  exports: []
})

export class PlaceModule {

}
