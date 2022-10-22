import { gql } from "apollo-server-micro";

export const GET_BLOGS = gql`
  query GetAllBlogs($limit: Int, $search: String) {
    getAllBlogs(limit: $limit, search: $search) {
      _id
      title
      description
      author
      authorImg
      date
      thumbnail
      price
      modality
    }
  }
`;

export const CREATE_BLOG = gql`
  mutation AddBlog(
    $title: String!
    $description: String!
    $author: String!
    $authorImg: String!
    $date: String!
    $thumbnail: String!
    $img: String!
    $captionImage: String!
    $price: String!
    $modality: String!
    $content: String!
  ) {
    addBlog(
      title: $title
      description: $description
      author: $author
      authorImg: $authorImg
      date: $date
      thumbnail: $thumbnail
      img: $img
      captionImage: $captionImage
      price: $price
      modality: $modality
      content: $content
    ) {
      _id
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation UpdateBlog(
    $_id: String!
    $title: String!
    $description: String!
    $author: String!
    $authorImg: String!
    $date: String!
    $thumbnail: String!
    $img: String!
    $captionImage: String!
    $price: String!
    $modality: String!
    $content: String!
  ) {
    updateBlog(
      _id: $_id
      title: $title
      description: $description
      author: $author
      authorImg: $authorImg
      date: $date
      thumbnail: $thumbnail
      img: $img
      captionImage: $captionImage
      price: $price
      modality: $modality
      content: $content
    ) {
      _id
    }
  }
`;

export const GET_BLOGS_BY_IDS = gql`
  query GetBlogsByIds($ids: [String]!, $limit: Int, $search: String) {
    getBlogsByIds(ids: $ids, limit: $limit, search: $search) {
      _id
      title
      description
      author
      authorImg
      date
      thumbnail
      price
      modality
    }
  }
`;

export const GET_BLOG_BY_ID = gql`
  query GetBlogById($id: String!) {
    getBlogById(id: $id) {
      _id
      title
      description
      author
      authorImg
      thumbnail
      date
      img
      captionImage
      modality
      price
      content
    }
  }
`;

export const SIGN_UP = gql`
  mutation Mutation($email: String!, $name: String!, $password: String!) {
    signUp(email: $email, name: $name, password: $password) {
      _id
      email
      name
      favoriteBlogsIds
    }
  }
`;

export const SIGN_IN = gql`
  query SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      email
      name
    }
  }
`;

export const GET_FAVORITE_BLOGS_IDS_BY_USER = gql`
  query GetFavoriteBlogsIdsByUser($email: String!) {
    getFavoriteBlogsIdsByUser(email: $email) {
      favoriteBlogsIds
    }
  }
`;

export const SET_FAVORITE_BLOG = gql`
  mutation Mutation($blogId: String!, $userEmail: String!) {
    setFavoriteBlog(blogId: $blogId, userEmail: $userEmail) {
      _id
    }
  }
`;

export const REMOVE_FAVORITE_BLOG = gql`
  mutation Mutation($blogId: String!, $userEmail: String!) {
    removeFavoriteBlog(blogId: $blogId, userEmail: $userEmail) {
      _id
    }
  }
`;
