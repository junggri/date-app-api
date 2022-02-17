import {Args, Mutation, Resolver} from '@nestjs/graphql'
import {LikeService} from "@src/like/like.service";
import {Likes} from "@src/entities";
import {LikeInput} from "@src/like/input/like.input";
import {ctx} from "@decorator/gqlContext.decorator";
import {Response} from "express";

@Resolver()
export class LikeResolver {
  constructor(
    private readonly likeService: LikeService
  ) {
  }

  @Mutation(() => Likes)
  async createLike(@ctx() res: Response, @Args('data') data: LikeInput) {
    return await this.likeService.createLike(res, data)
  }
}