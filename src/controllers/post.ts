import { authenticate } from '../services/auth';

export interface Post {
  title: string;
  description: string;
  sources: string[];
  tags: string[];
  comments: string[];
}

const posts = [
  {
    title: 'Yui hatano',
    description: 'lorem',
    sources: ['asd', 'sdf'],
    tags: ['sdffghf', '5yr'],
    comments: ['s1230', '56uthg1'],
  },
  {
    title: 'Test',
    description: 'lorem',
    sources: ['asd', 'sdf'],
    tags: ['sdffghf', '5yr'],
    comments: ['s1230', '56uthg1'],
  },
];

class PostController {
  @authenticate
  static getPosts(parent: any, args: any, context: any): Post[] {
    console.log('hello', parent, args, context);
    return posts;
  }
}

export default PostController;
