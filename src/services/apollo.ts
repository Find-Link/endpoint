import { gql } from 'apollo-server';
import PostController from '../controllers/post';
import { postDefs } from '../models/Post.type';
import { commentDefs } from '../models/Comment.type';
import { linkDefs } from '../models/Link.type';
import { listLinkDefs } from '../models/ListLink.type';
import { userDefs } from '../models/User.type';

const typeDefs = gql`
  ${commentDefs}
  ${linkDefs}
  ${listLinkDefs}
  ${postDefs}
  ${userDefs}

  type Query {
    posts: [Post]
  }

  type Mutation {
    addPost(newPost: AddPostInput): Post
  }
`;

const resolvers = {
  Query: {
    posts: PostController.getPosts,
  },

  ListLink: {
    listLinks: PostController.getListLinks,
  },

  Source: {
    books(parent) {
      // Filter the hardcoded array of books to only include
      // books that are located at the correct branch
      return books.filter((book) => book.branch === parent.branch);
    },
  },

  Comment: {
    books(parent) {
      // Filter the hardcoded array of books to only include
      // books that are located at the correct branch
      return books.filter((book) => book.branch === parent.branch);
    },
  },

  Mutation: {
    addPost: PostController.addPost,
  },
};

export { typeDefs, resolvers };
