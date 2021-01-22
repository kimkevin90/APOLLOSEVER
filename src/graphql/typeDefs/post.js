import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getAllPosts: [Post!]!
    getPostById(id: Int!): Post!
  }

  extend type Mutation {
    createNewPost(newPost: PostInput!): Post!
    deletePostById(id: Int!): PostNotification!
    editPostByID(updatedPost: PostInput, id: Int!): Post!
  }

  input PostInput {
    title: String!
    content: String!
    featuredImage: String
  }

  type Post {
    id: Int!
    title: String!
    content: String!
    featuredImage: String
    createdAt: String
    updatedAt: String
  }

  type PostNotification {
    id: Int!
    message: String!
    success: Boolean
  }
`;
