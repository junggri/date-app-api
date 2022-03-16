import {Field, ObjectType} from "@nestjs/graphql";
import {Column, Entity, OneToMany} from "typeorm";
import {Base} from "./BaseEntity";
import {Place} from "@src/entities/Place";


@ObjectType()
@Entity()

export class User extends Base {
  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  userImage: string

  @Field()
  @Column()
  birthDay: Date

  @Field()
  @Column()
  phoneNumber: string

  @Field(() => [Place])
  @OneToMany(() => Place, place => place.user)
  place: [Place]
}
