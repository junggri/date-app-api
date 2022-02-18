import {Field, ObjectType} from "@nestjs/graphql";
import {Column, Entity} from "typeorm";
import {Base} from "./BaseEntity";


@ObjectType()
@Entity()

export class User extends Base {
  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  userImage: string


}
