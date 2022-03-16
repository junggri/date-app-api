import {Field, ObjectType} from "@nestjs/graphql";
import {Column, Entity, ManyToOne, OneToOne} from "typeorm";
import {Base} from "@src/entities/BaseEntity"
import {Register} from "@src/entities/Register";
import {Record} from "@src/entities/Record";
import {User} from "@src/entities/User";


@ObjectType()
@Entity()

export class Place extends Base {

  @Field()
  @Column()
  buildingName: string

  @Field()
  @Column()
  roadAddress: string

  @Field()
  @Column()
  latitude: number

  @Field()
  @Column()
  longitude: number

  @Field(() => Register)
  @ManyToOne(() => Register, register => register.place)
  register: Register

  @Field(() => Record)
  @OneToOne(() => Record, record => record.place)
  record: Record


  @Field(() => User)
  @ManyToOne(() => User, user => user.place)
  user: User
}
