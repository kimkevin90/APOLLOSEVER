export default {
  Query: {
    getAllPosts: async (_, {}, { Post }) => {
      let posts = await Post.findAll();
      return posts;
    },
    getPostById: async (_, { id }, { Post }) => {
      let postById = await Post.findOne({
        where: { id },
      });
      return postById;
    },
  },
  Mutation: {
    createNewPost: async (_, { newPost }, { Post }) => {
      // console.log(newPost);
      // console.log(Post);
      let result = await Post.create(newPost);
      // console.log(newPost);
      return result;
    },
    editPostByID: async (_, { id, updatedPost }, { Post }) => {
      let returnValue = null;
      await Post.update(
        {
          ...updatedPost,
        },
        { where: { id: id } }
      );

      returnValue = await Post.findOne({ where: { id } });
      return returnValue;
    },
    deletePostById: async (_, { id }, { Post }) => {
      let deletedPost = await Post.destroy({
        where: { id },
      });
      // console.log(deletedPost);
      return {
        id: 3,
        message: "Your posts is deleted",
        success: true,
      };
    },
  },
};
