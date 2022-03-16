import {Field, ObjectType} from "@nestjs/graphql";
import {Column, Entity, OneToMany} from "typeorm";
import {Base} from "@src/entities/BaseEntity"
import {Place} from "@src/entities/Place";


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

  @Field()
  @Column()
  description: string

  @Field(() => [Place])
  @OneToMany(() => Place, place => place.register)
  place: Place[]
}
