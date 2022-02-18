import {Query, Resolver} from '@nestjs/graphql';
import {Register} from "@src/entities";

@Resolver(() => Register)
export class RegisterResolver {


  constructor() {
  }

  @Query(() => String)
  ping() {
    return "Pong"
  }
}
