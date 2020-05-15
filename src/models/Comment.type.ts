import { gql } from 'apollo-server';
import { Schema, Document } from 'mongoose';

const commentDefs = gql`
  type Comment {
    _id: ID
    content: String
    user: User
    post: Post
  }
`;

export interface Comment {
  content: string;
  user: string;
  post: string;
}

export interface CommentModel extends Document, Omit<Comment, 'user' | 'post'> {
  user: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
}

export { commentDefs };
