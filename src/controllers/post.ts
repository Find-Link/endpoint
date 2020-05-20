import { authenticate } from '../services/auth';
import { Post } from '../models/Post.type';

class PostController {
  static getPosts(parent: any, args: any, context: any): Post[] {
    console.log('hello', parent, args, context);
    return [];
  }

  static async addPost(parent: any, args: any, context: any): Promise<Post[]> {
    const { newPost: { thumbnail } } = args;
    const test = await thumbnail;

    console.log(test);

    console.log('Add post', parent, args, context);
    return [];
  }
}

export default PostController;
