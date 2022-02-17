//프래그먼트의 타입은 서버에서 나온 타입이다.
export const tag_fragment = `
    fragment tagBody on Tag{
        hashId
        createdAt
        updatedAt
        tag
    }
`;

export const like_fragment = `
   fragment likeBody on Likes{
        hashId
        createdAt
        updatedAt
   }
`

export const reply_fragment = `
   fragment replyBody on Reply{
      createdAt
      bgroup
      sorts
      depth
      comment
      writer
      hashId
      children{
         id
         createdAt
         bgroup
         sorts
         depth
         comment
         writer
         hashId
      }
   }
`;

export const hit_fragment = `
   fragment hitBody on Hit{
      createdAt
      updatedAt
      hashId
   }
`;


export const post_fragment = `
   ${hit_fragment}
   ${reply_fragment}
   ${tag_fragment}
   ${like_fragment}
   fragment postBody on Post {
      hashId     
      title
      desc
      content
      thumbnail
      createdAt
      updatedAt
      open
      hit {
         ...hitBody
      }
      reply{
         ...replyBody
      }
      tag{
        ...tagBody
      }
      likes{
         ...likeBody
      }
   }
`;


export const Get_Posts_Query = `
   ${post_fragment}
   query gql {
      posts{
         ...postBody
      } 
   }   
`;


export const Get_Post_Query = `
   ${post_fragment}
   query gql($hashId : String!){
      post(hashId : $hashId){
         ...postBody    
      }
   }
`;


export const GET_S3 = `
    query gql($data:String!){
        getS3data(data:$data)
    }
`;

export const DASH_BOARD = `
   query gql($hashId: String!, $data : DashBoardInput!){
      getDashBoard(hashId : $hashId, data : $data){
         id
         hashId
         createdAt
         updatedAt
      }
   }
`;

export const GET_REPLY = `
    ${reply_fragment}
    query gql($data : ReplyInput!){
       getReply(data : $data){
          ...replyBody
       }
    }
`;