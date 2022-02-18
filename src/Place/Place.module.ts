import {Module} from "@nestjs/common";
import {PlaceService} from "@src/Place/Place.service";
import {PlaceResolver} from "@src/Place/Place.resolver";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Place} from "@src/entities";

@Module({
  imports: [
    TypeOrmModule.forFeature([Place])
  ],
  providers: [
    PlaceService,
    PlaceResolver
  ],
  exports: []
})

export class PlaceModule {

}
