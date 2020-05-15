import { gql } from 'apollo-server';
import PostController from '../controllers/post';
import { postDefs } from '../models/Post.type';

const typeDefs = gql`
  ${postDefs}
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
