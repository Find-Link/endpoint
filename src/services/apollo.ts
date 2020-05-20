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

  Mutation: {
    addPost: PostController.addPost,
  },
};

export { typeDefs, resolvers };
