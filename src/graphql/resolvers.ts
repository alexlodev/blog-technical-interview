import Blog from "@db/models/blog";
import User from "@db/models/user";

export const resolvers = {
  Query: {
    getAllBlogs: async (
      _: unknown,
      arg: { limit?: number; search?: string }
    ) => {
      let blogs;
      const limit = arg.limit || 10;
      const search = arg.search || "";

      if (!!search) {
        blogs = await Blog.find({ $text: { $search: search } }).limit(limit);
      } else {
        blogs = await Blog.find({}).limit(limit);
      }

      return blogs;
    },

    getBlogsByIds: async (
      _: unknown,
      arg: { ids: string[]; limit?: number; search?: string }
    ) => {
      let blogs;
      const ids = arg.ids;
      const limit = arg.limit || 10;
      const search = arg.search || "";

      if (!!search) {
        blogs = await Blog.find({ $text: { $search: search } })
          .where("_id")
          .in(ids)
          .limit(limit);
      } else {
        blogs = await Blog.find({}).where("_id").in(ids).limit(limit);
      }
      return blogs;
    },

    getFavoriteBlogsIdsByUser: async (_: unknown, arg: { email: string }) => {
      const email = arg.email;

      const user = await User.findOne({ email: email });
      return user;
    },

    getBlogById: async (_: unknown, arg: { id: string }) => {
      const blog = await Blog.findOne({ _id: arg.id });
      return blog;
    },

    searchBlogs: async (_: unknown, arg: { search: string }) => {
      const { search } = arg;
      const blogs = await Blog.find({ $text: { $search: search } });
      return blogs;
    },

    signIn: async (_: unknown, arg: { email: string; password?: string }) => {
      const { email } = arg;
      const user = await User.findOne({ email });

      return user;
    },
  },
  Mutation: {
    addBlog: async (_: unknown, arg: { newBlog: any }) => {
      const newBlog = new Blog({ ...arg });
      newBlog.save();
      return newBlog;
    },

    updateBlog: async (_: unknown, arg: any) => {
      const blog = await Blog.findOneAndUpdate(
        { _id: arg._id },
        { ...arg },
        { new: true }
      );

      blog.save();

      return blog;
    },

    signUp: (
      _: unknown,
      arg: { email: string; password: string; name: string }
    ) => {
      const { email, password, name } = arg;
      const user = new User({ email, password, name, favoriteBlogsIds: [] });
      user.save();

      return user;
    },

    setFavoriteBlog: async (
      _: unknown,
      arg: { blogId: string; userEmail: string }
    ) => {
      const { blogId, userEmail } = arg;
      const user = await User.findOne({ email: userEmail });
      const favoriteBlogsIds = user.favoriteBlogsIds;
      const index = favoriteBlogsIds.indexOf(blogId);

      if (index === -1) {
        favoriteBlogsIds.push(blogId);
      } else {
        favoriteBlogsIds.splice(index, 1);
      }
      user.favoriteBlogsIds = favoriteBlogsIds;
      user.save();

      return user;
    },

    removeFavoriteBlog: async (
      _: unknown,
      arg: { blogId: string; userEmail: string }
    ) => {
      const { blogId, userEmail } = arg;
      const user = await User.findOne({ email: userEmail });
      const favoriteBlogsIds = user.favoriteBlogsIds;
      const index = favoriteBlogsIds.indexOf(blogId);
      if (index !== -1) {
        favoriteBlogsIds.splice(index, 1);
      }
      user.favoriteBlogsIds = favoriteBlogsIds;
      user.save();

      return user;
    },
  },
};
