import { UserSchema } from '../models/User.type';
import UserModel from '../models/User';
import PostModel from '../models/Post';
import { PostSchema } from '../models/Post.type';

class CommentController {
  static async user({ user }: any): Promise<UserSchema | null> {
    return UserModel.findById(user).exec();
  }

  static async post({ post }: any): Promise<PostSchema | null> {
    return PostModel.findById(post).exec();
  }
}

export default CommentController;
