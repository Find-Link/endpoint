import { gql } from 'apollo-server';
import { Schema, Document } from 'mongoose';
import { WithId } from '../services/utils';

const commentDefs = gql`
  type Comment {
    _id: ID
    content: String
    user: User
    post: Post
  }
`;

export interface Comment extends WithId {
  content: string;
  user: string;
  post: string;
}

export interface CommentModel extends Document, Omit<Comment, '_id' | 'user' | 'post'> {
  user: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
}

export { commentDefs };
