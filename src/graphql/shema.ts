import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Blog {
    _id: String!
    title: String!
    description: String!
    author: String!
    authorImg: String!
    date: String!
    thumbnail: String!
    img: String!
    captionImage: String!
    price: String!
    modality: String
    content: String!
  }

  type User {
    _id: String!
    email: String!
    password: String!
    name: String!
    favoriteBlogsIds: [String]
  }

  type Query {
    getAllBlogs(limit: Int, search: String): [Blog]
    getFavoriteBlogsIdsByUser (email: String!): User
    getBlogsByIds(ids: [String]!, limit: Int, search: String): [Blog]
    signIn(email: String!, password: String!): User
    searchBlogs(search: String!): [Blog]
    getBlogById(id: String!): Blog
  }

  type Mutation {
    addBlog(
      title: String!
      description: String!
      author: String!
      authorImg: String!
      date: String!
      thumbnail: String!
      img: String!
      captionImage: String!
      price: String!
      modality: String!
      content: String!
    ): Blog
    updateBlog(
      _id: String!
      title: String!
      description: String!
      author: String!
      authorImg: String!
      date: String!
      thumbnail: String!
      img: String!
      captionImage: String!
      price: String!
      modality: String!
      content: String!
    ): Blog
    signUp(email: String!, password: String!, name: String!): User
    setFavoriteBlog(blogId: String!, userEmail: String!): User
    removeFavoriteBlog(blogId: String!, userEmail: String!): User
  }
`;
