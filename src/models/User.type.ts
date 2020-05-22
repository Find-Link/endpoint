import { gql } from 'apollo-server';
import { Schema, Document } from 'mongoose';
import { WithId } from '../services/utils';
import { Comment } from './Comment.type';
import UserController from '../controllers/user';

const userDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    comments: [Comment]
  }
`;

const userResolvers = {
  User: {
    comments: UserController.comments,
  },
};

export interface User extends WithId {
  name: string;
  email: string;
  password: string;
  comments: Comment[];
}

export interface UserSchema extends Document, Omit<User, '_id' | 'comments'> {
  comments: Schema.Types.ObjectId[];
}

export { userDefs, userResolvers };
