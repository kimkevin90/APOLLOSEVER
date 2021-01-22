const postsResolvers = require("./posts");
const userssResolvers = require("./users");
const commentsResolvers = require("./comments");

module.exports = {
  Post: {
    likeCount: (parent) => parent.Likes.length,
    commentCount: (parent) => parent.Comments.length,
  },
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...userssResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};
