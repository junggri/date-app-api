import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Record} from "@src/entities";
import {Repository} from "typeorm";

@Injectable()

export class RecordService {
  constructor(@InjectRepository(Record) private recordRepository: Repository<Record>,) {
  }
}
