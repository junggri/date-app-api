import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Picture} from "@src/entities";
import {Repository} from "typeorm";

@Injectable()
export class PictureService {

  constructor(
    @InjectRepository(Picture) private pictureRepository: Repository<Picture>,
  ) {
  }


}
