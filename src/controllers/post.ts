import { authenticate } from '../services/auth';
import { Post } from '../models/Post.type';

class PostController {
  @authenticate
  static getPosts(parent: any, args: any, context: any): Post[] {
    console.log('hello', parent, args, context);
    return [];
  }
}

export default PostController;
