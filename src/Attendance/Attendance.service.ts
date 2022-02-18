import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Attendance} from "@src/entities";
import {Repository} from "typeorm";

@Injectable()
export class AttendanceService {
  constructor(@InjectRepository(Attendance) private postRepository: Repository<Attendance>) {
  }
}
