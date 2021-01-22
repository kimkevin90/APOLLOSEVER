const { AuthenticationError, UserInputError } = require("apollo-server");
const { Post } = require("../../models");
const { Comment } = require("../../models");
const { Likes } = require("../../models");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.findAll({
          include: [{ model: Comment }, { model: Likes }],
          order: [["createdAt", "DESC"]],
        });
        // console.log(posts);
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findOne({
          where: { id: postId },
          include: [{ model: Comment }, { model: Likes }],
        });
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      //   console.log(user);

      if (body.trim() === "") {
        throw new Error("Post body must not be empty");
      }
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
      });

      const post = await newPost.save();

      const temp = await Post.findOne({
        where: { id: post.id },
        include: [
          {
            model: Comment,
          },
          {
            model: Likes,
          },
        ],
      });
      console.log(temp);
      context.pubsub.publish("NEW_POST", {
        newPost: temp,
      });
      return temp;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findByPk(postId);
        // console.log(post);
        if (user.username === post.username) {
          await post.destroy();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findOne({
        where: { id: postId },
        include: [{ model: Likes }],
      });

      console.log(post.Likes);
      if (post) {
        if (post.Likes.find((like) => like.username === username)) {
          // Post already likes, unlike it
          await Likes.destroy({
            where: { username: username, PostId: post.id },
          });
          //   post.Likes = post.Likes.filter((like) => like.username !== username);
          //   console.log(post.Likes.filter((like) => like.username !== username));
        } else {
          // Not liked, like post
          const newlike = new Likes({
            username: username,
            PostId: postId,
          });
          await newlike.save();
          //   post.Likes.push({
          //     username,
          //   });
        }

        const NEWpost = await Post.findOne({
          where: { id: postId },
          include: [{ model: Likes }],
        });
        // await post.save();
        // const newpost = await Post.findOne({
        //   where: { id: postId },
        //   include: [{ model: Likes }],
        // });
        return NEWpost;
      } else throw new UserInputError("Post not found");
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    },
  },
};
