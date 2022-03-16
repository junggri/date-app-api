import {Resolver} from '@nestjs/graphql';
import {Rest} from "@src/entities/Rest";

@Resolver(() => Rest)
export class RestResolver {


  constructor() {
  }

}
