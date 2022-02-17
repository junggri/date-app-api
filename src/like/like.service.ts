import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Likes} from "@src/entities";
import {Repository} from "typeorm";
import {LikeInput} from "@src/like/input/like.input";
import {Response} from 'express';
import {v4} from "uuid";
import {HashidsService} from "@src/hashids/hashids.service";
import {SIX_MONTHS} from "@utils/constant";


@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Likes) private readonly likeRepository: Repository<Likes>,
    private readonly hashIdsService: HashidsService
  ) {
  }

  parseCookie(value: string | undefined) {
    if (!value) {
      return [];
    }

    return Buffer.from(unescape(value), "base64")
      .toString("ascii")
      .split('/_/g')
      .filter((i) => i);
  }

  async createLike(res: Response, data: LikeInput) {
    const postIdentifier = res.req.cookies['like_identifier'];
    const identifier = postIdentifier ? postIdentifier : v4();

    const likePost = this.parseCookie(res.req.cookies["like_post"]);

    if (likePost.indexOf(data.postHashId) !== -1) {
      return null;
    }

    const postId = this.hashIdsService.decode(data.postHashId);

    if (!postId) {
      throw new Error("유효하지 않은 접근입니다.");
    }

    const insertResult = await this.likeRepository
      .createQueryBuilder('like')
      .insert()
      .into(Likes)
      .values({
        identifier: identifier,
        postId: postId
      })
      .execute();

    
    const like = await this.likeRepository
      .createQueryBuilder('like')
      .select()
      .where("id = :id", {id: insertResult.identifiers[0].id})
      .getOne();

    if (like) {
      res.cookie(
        "like_post", Buffer.from([...likePost, data.postHashId].join('_')).toString("base64"),
        {httpOnly: true, secure: true, maxAge: SIX_MONTHS}
      );
    }

    if (!postIdentifier) {
      res.cookie('like_identifier', identifier, {httpOnly: true, secure: true, maxAge: SIX_MONTHS});
    }

    return like;
  }
}