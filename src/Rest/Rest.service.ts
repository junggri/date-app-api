import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Rest} from "@src/entities/Rest";

@Injectable()
export class RestService {

  constructor(
    @InjectRepository(Rest) private restRepository: Repository<Rest>,
  ) {
  }

  
}
