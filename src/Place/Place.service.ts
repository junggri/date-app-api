import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Place} from "@src/entities";
import {Repository} from "typeorm";

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place) private placeRepository: Repository<Place>,
  ) {
  }
}
