import { gql } from 'apollo-server';
import { Schema, Document } from 'mongoose';
import { WithId } from '../services/utils';
import { User } from './User.type';
import { Post } from './Post.type';
import CommentController from '../controllers/comment';

const commentDefs = gql`
  type Comment {
    _id: ID
    content: String
    user: User
    post: Post
  }
`;

const commentResolvers = {
  Comment: {
    user: CommentController.user,
    post: CommentController.post,
  },
};

export interface Comment extends WithId {
  content: string;
  user: User;
  post: Post;
}

export interface CommentSchema extends Document, Omit<Comment, '_id' | 'user' | 'post'> {
  user: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
}

export { commentDefs, commentResolvers };
