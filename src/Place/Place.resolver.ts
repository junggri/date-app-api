import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {PlaceService} from "@src/Place/Place.service";
import {PlaceInput} from "@src/Place/input/place.input";
import {Place} from "@src/entities";

@Resolver()

export class PlaceResolver {
  constructor(
    private readonly placeService: PlaceService
  ) {
  }

  @Query(() => String)
  ping() {
    return "pong"
  }

  @Query(() => [Place])
  async getPlace() {
    return this.placeService.getPlace()
  }

  @Mutation(() => String)
  async insertPlace(@Args('data') data: PlaceInput) {
    return await this.placeService.createPlace(data)
  }
}

