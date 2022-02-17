import request from "supertest";
import {ChangeTo_Private_Post, Delete_Post_Query, UPSERT_POST, UPSERT_REPLY, UPSERT_TAG} from "./mutations/mutation";
import {Get_Post_Query, Get_Posts_Query, GET_REPLY} from "./queries/query";
import faker from "faker";


describe('post e2e test', () => {

  it('모든 포스트를 가져옵니다', async () => {
    const {body: {data: posts}} = await request(global.app.getHttpServer())
      .post('/graphql')
      .send({query: Get_Posts_Query});

    expect(posts).not.toBeNull();
  });

  it("포스트 하나를 가져옵니다", async () => {
    const {body: {data: post}} = await request(global.app.getHttpServer())
      .post("/graphql")
      .send({
        query: Get_Post_Query, variables: {
          hashId: "90lVXoJ"
        }
      });
    expect(post).not.toBeNull();
  });

  it("포스트를 비공개 처리합니다", async () => {
    const {body: {data: {toPrivate}}} = await request(global.app.getHttpServer())
      .post("/graphql")
      .send({query: ChangeTo_Private_Post, variables: {hashId: "90lVXoJ"}});

    expect(toPrivate).toBe("1");
  });


  it("포스트를 생성합니다", async () => {
    const {body: {data: {upsertPost}}} = await request(global.app.getHttpServer())
      .post('/graphql')
      .send({
        query: UPSERT_POST, variables: {
          data: {
            // hashId: "90lVXoJ",
            title: "teasdcacascasc",
            desc: ",asdasd",
            content: faker.lorem.sentence(),
            open: true,
            isPublished: false,
            thumbnail: null,
            tagIds: [1, 2, 3, 4, 5, 6]
          },
          // file: {
          //     filename: "Test",
          //     encoding: "7bit",
          //     mimetype: "image/png",
          //     createReadStream: () => fs.createWriteStream("test/img/testimg.png")
          // }
        }
      });

    expect(upsertPost).not.toBe(null);
  });

  it("포스트 하나를 삭제합니다", async () => {
    const {body} = await request(global.app.getHttpServer())
      .post('/graphql')
      .send({query: Delete_Post_Query, variables: {hashId: "90lVXoJ"}});

    expect(body).not.toBe(null);
  });


  it("댓글을 가져옵니다", async () => {
    const {body: {data: getReply}} = await request(global.app.getHttpServer())
      .post('/graphql')
      .send({query: GET_REPLY, variables: {data: {hashId: '90lVXoJ'}}});

    expect(getReply).not.toBeNull();
  });


  it("댓글을 생성합니다", async () => {
    const {body} = await request(global.app.getHttpServer())
      .post('/graphql')
      .send({
        query: UPSERT_REPLY, variables: {
          data: {
            hashId: '90lVXoJ',//postid
            comment: faker.lorem.sentence(),
            writer: faker.name.findName(),
            replyHashId: null,
            parentId: null
          }
        }
      });
    // console.log(body);
  });

  it("태그를 생성합니다", async () => {
    const {body} = await request(global.app.getHttpServer())
      .post('/graphql')
      .send({
        query: UPSERT_TAG, variables: {
          data: {
            tagName: "teds",
            hashId: null
          }
        }
      });
  });
});


// curl localhost:5000/graphql \
//   -F operations='{ "query": "mutation ($file: Upload!) { createImage(file: $file)  }", "variables": { "file": null } }' \
//   -F map='{ "0": ["variables.file"] }' \
//   -F 0=@test/img/testimg.png \


// curl localhost:3001/graphql \
//   -F operations='{ "query": "mutation($files: [Upload!]!) { multipleUpload(files: $files) { id } }", "variables": { "files": [null, null] } }' \
//   -F map='{ "0": ["variables.files.0"], "1": ["variables.files.1"] }' \
//   -F 0=@b.txt \
//   -F 1=@c.txt