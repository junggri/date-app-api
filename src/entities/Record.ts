import {Field, ObjectType} from "@nestjs/graphql";
import {Column, Entity, OneToMany, OneToOne} from "typeorm";
import {Base} from "@src/entities/BaseEntity"
import {Place} from "@src/entities/Place";
import {Picture} from "@src/entities/Picture";


@ObjectType()
@Entity()

export class Record extends Base {
  @Field()
  @Column()
  who: string

  @Field()
  @Column()
  url: string

  @Field()
  @Column()
  description: string

  @Field(() => Place)
  @OneToOne(() => Place, place => place.record)
  place: Place

  @Field(() => [Picture])
  @OneToMany(() => Picture, picture => picture.record)
  picture: [Picture]

}
