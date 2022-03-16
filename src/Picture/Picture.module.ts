import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Picture} from "@src/entities";
import {PictureService} from "@src/Picture/Picture.service";
import {PictureResolver} from "@src/Picture/Picture.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Picture])],
  providers: [
    PictureService,
    PictureResolver
  ],
  exports: []
})

export class PictureModule {

}
