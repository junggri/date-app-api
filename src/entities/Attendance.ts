import {Field, ObjectType} from "@nestjs/graphql";
import {Column, Entity, PrimaryColumn} from "typeorm";


@ObjectType()
@Entity()

export class Attendance {
  @PrimaryColumn()
  who: string

  @Field()
  @Column()
  monday: string

  @Field()
  @Column()
  tuesday: string

  @Field()
  @Column()
  wednesday: string

  @Field()
  @Column()
  thursday: string

  @Field()
  @Column()
  friday: string
}
