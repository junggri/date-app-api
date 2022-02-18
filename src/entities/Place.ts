import {Field, ObjectType} from "@nestjs/graphql";
import {Column, Entity} from "typeorm";
import {Base} from "@src/entities/BaseEntity"


@ObjectType()
@Entity()

export class Place extends Base {
  //
  // @ManyToOne(() => Post, post => post.likes, {onDelete: 'CASCADE'})
  // @JoinColumn({name: 'post_id'})
  // post: Post

  @Field()
  @Column()
  who: string

  @Field()
  @Column()
  address: string

  @Field()
  @Column()
  date: Date
}
