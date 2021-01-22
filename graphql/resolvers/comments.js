const { AuthenticationError, UserInputError } = require("apollo-server");

const checkAuth = require("../../util/check-auth");
const { Comment } = require("../../models");
const { Post } = require("../../models");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not empty",
          },
        });
      }

      const post = await Post.findByPk(postId);

      if (post) {
        const newComment = new Comment({
          body,
          username,
          PostId: post.id,
        });

        await newComment.save();
        const temp = await Post.findOne({
          where: { id: postId },
          include: [
            {
              model: Comment,
            },
          ],
        });

        // console.log(comment);
        return temp;
      } else throw new UserInputError("Post not found");
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);
      try {
        const comment = await Comment.findByPk(commentId);
        // console.log(post);
        if (username === comment.username) {
          await comment.destroy();
          const temp1 = await Post.findOne({
            where: { id: postId },
            include: [
              {
                model: Comment,
              },
            ],
          });
          return temp1;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
