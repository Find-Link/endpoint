import { gql } from 'apollo-server';
import { Schema, Document } from 'mongoose';
import { WithId } from '../services/utils';

const userDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    comments: [Comment]
  }
`;

export interface User extends WithId {
  name: string;
  email: string;
  password: string;
  comments: string[];
}

export interface UserModel extends Document, Omit<User, '_id' | 'comments'> {
  comments: Schema.Types.ObjectId[];
}

export { userDefs };
