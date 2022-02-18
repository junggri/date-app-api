import {Field, ObjectType} from "@nestjs/graphql";
import {Column, Entity} from "typeorm";
import {Base} from "@src/entities/BaseEntity"


@ObjectType()
@Entity()

export class Register extends Base {
  @Field()
  @Column()
  who: string

  @Field()
  @Column()
  address: string

  @Field()
  @Column()
  date: Date

  @Column()
  period: number
}
