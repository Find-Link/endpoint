import { gql } from 'apollo-server';
import PostController from '../controllers/post';

const typeDefs = gql`
  type Post {
    title: String
    description: String
    sources: [String]
    tags: [String]
    comments: [ID]
  }

  type Query {
    posts: [Post]
  }
`;

const resolvers = {
  Query: {
    posts: PostController.getPosts,
  },
};

export { typeDefs, resolvers };
