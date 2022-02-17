import request from "supertest"
import {CREATE_VISIT} from "./mutations/mutation";

describe("visit test", () => {
  it("visit을 생성합니다", async () => {
    const data = await request(global.app.getHttpServer())
      .post('/graphql')
      .send({query: CREATE_VISIT})


    // console.log(data)
  })

})