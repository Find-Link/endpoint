import { gql } from 'apollo-server';
import { Schema, Document } from 'mongoose';

const userDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    comments: [Comment]
  }
`;

export interface User {
  name: string;
  email: string;
  password: string;
  comments: string[];
}

export interface UserModel extends Document, Omit<User, 'comments'> {
  comments: Schema.Types.ObjectId[];
}

export { userDefs };
