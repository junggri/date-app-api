import {Field, ObjectType} from "@nestjs/graphql";
import {Column, Entity} from "typeorm";
import {Base} from "@src/entities/BaseEntity"


@ObjectType()
@Entity()

export class Record extends Base {
  @Field()
  @Column()
  who: string

  @Field()
  @Column()
  url: string
}
