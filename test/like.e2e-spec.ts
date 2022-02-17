import request from "supertest";
import {CREATE_LIKE} from "./mutations/mutation";

describe("like 테스트", () => {

  it("포스트를 좋아요 합니다", async () => {
    const {body} = await request(global.app.getHttpServer())
      .post("/graphql")
      .send({
        query: CREATE_LIKE, variables: {
          data: {postHashId: "90lVXoJ"}
        }
      })
      .set('cookie', 'like_post=90lVXoJ');
    // .expect((res) => console.log(res.headers));

  });
});