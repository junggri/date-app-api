import {Field, ObjectType} from "@nestjs/graphql";
import {Column, Entity, ManyToOne} from "typeorm";
import {Base} from "./BaseEntity";
import {Record} from "@src/entities/Record";

@ObjectType()
@Entity()
export class Picture extends Base {

  @Field()
  @Column()
  who: string

  @Field()
  @Column()
  url: string


  @Field(() => Record)
  @ManyToOne(() => Record, record => record.picture)
  record: Record
}
