import {like_fragment, post_fragment} from "../queries/query";

export const Delete_Post_Query = `
   mutation gql($hashId : String!){
      deletePost(hashId : $hashId)
   }
`;

export const ChangeTo_Private_Post = `
   mutation gql($hashId : String!){
      toPrivate(hashId : $hashId)
   }
`;

export const create_Post = `
    mutation gql($data : PostInput!, $file :Upload!){
        createPost(data : $data, file : $file)
    }
`;

export const create_Hit = `
    mutation gql($data : HitInput!){
        createHit(data : $data){
            id
            hashId
            createdAt
            updatedAt
        }
    }
`;

export const TEST_IMAGE = `
    mutation gql($file :Upload!){
        createImage(file : $file)
    }
`;

export const TEXT_UPLOAD = `
    mutation gql($data : String!, $filename : String!){
        upLoadContentToS3(data: $data , filename : $filename)
    }
`;

export const UPSERT_POST = `
    ${post_fragment}
    mutation gql($data : PostInput!, $file :Upload){
        upsertPost(data : $data, file : $file){ 
             ...postBody
        }
    }
`;

export const UPSERT_REPLY = `
    mutation gql($data : ReplyCreateInput!){
        upsertReply(data : $data){
            createdAt
            bgroup
            sorts
            depth
            comment
            writer
            parentId
            hashId
        }
    }
`;

export const UPSERT_TAG = `
    mutation gql($data : TagInput!){
        upsertTag(data : $data){
            hashId
            createdAt
            updatedAt
            tag
        }
    }
`;

export const DELETE_REPLY = `
    mutation gql($data : ReplyInput!){
        deleteReply(data : $data)
    }
`;

export const CREATE_LIKE = `
   ${like_fragment}
    mutation gql($data : LikeInput!){
        createLike(data : $data){
            ...likeBody
        }
    }
`

export const CREATE_VISIT = `
  mutation gql{
    createVisit
  }
`