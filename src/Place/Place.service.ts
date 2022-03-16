import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Place} from "@src/entities";
import {Repository} from "typeorm";
import {UserService} from "@src/User/user.service";
import {PlaceInput} from "@src/Place/input/place.input";

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place) private placeRepository: Repository<Place>,
    private readonly userService: UserService
  ) {
  }

  async getPlace() {
    const result = await this.placeRepository
      .createQueryBuilder('place')
      .leftJoinAndSelect("place.user", "user")
      .getMany()

    console.log(result)
    return result
  }

  async createPlace(data: PlaceInput) {

    const isExisted = await this.placeRepository
      .createQueryBuilder("Place")
      .select()
      .where('place.building_name = :buildingName', {buildingName: data.buildingName})
      .getOne();


    if (isExisted) {
      throw  new Error("이미 존재하는 장소입니다.")
    } else {
      const user = await this.userService.getUser(data.who);

      const insertResult = await this.placeRepository
        .createQueryBuilder('Place')
        .insert()
        .into(Place)
        .values({
          user: user,
          buildingName: data.buildingName,
          roadAddress: data.roadAddress,
          latitude: data.latitude,
          longitude: data.longitude
        })
        .execute()

      return "success"
    }
  }

  async onApplicationBootstrap() {
    for (let i = 0; i < 10; i++) {
      const user = await this.userService.getUser("ey");

      await this.placeRepository
        .createQueryBuilder()
        .insert()
        .into(Place)
        .values({
          user: user,
          buildingName: 'test',
          roadAddress: 'test',
          latitude: 0,
          longitude: 0
        })
        .execute()
    }
  }
}
