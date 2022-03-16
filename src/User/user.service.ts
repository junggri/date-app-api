import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "@src/entities/User";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>
  ) {
  }

  async getUser(name: string) {
    const result = await this.userRepository
      .createQueryBuilder()
      .select()
      .where('user.name = :name', {name: name})
      .getOne()

    return result
  }

  async onApplicationBootstrap() {
    await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        name: "ey",
        userImage: "",
        birthDay: new Date(1994, 9, 5),
        phoneNumber: "01027181612"
      })
      .execute(),

      await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          name: "js",
          userImage: "",
          birthDay: new Date(1994, 10, 3),
          phoneNumber: "01077652103"
        })
        .execute()
  }

}
