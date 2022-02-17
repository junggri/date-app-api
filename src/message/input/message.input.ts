import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class MessageInput {

  @Field()
  name: string

  @Field()
  email: string

  @Field()
  phoneNumber: string

  @Field()
  content: string
}