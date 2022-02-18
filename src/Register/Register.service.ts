import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Register} from "@src/entities/Register";
import {Repository} from "typeorm";

@Injectable()

export class RegisterService {
  constructor(
    @InjectRepository(Register) private registerRepository: Repository<Register>,
  ) {
  }


}
