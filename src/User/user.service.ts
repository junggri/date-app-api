import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "@src/entities/User";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,) {
  }
}
