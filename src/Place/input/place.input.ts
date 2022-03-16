import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class PlaceInput {
  @Field()
  who: string

  @Field()
  buildingName: string

  @Field()
  roadAddress: string

  @Field()
  latitude: number

  @Field()
  longitude: number
}
