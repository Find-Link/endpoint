import { PostSchema } from '../models/Post.type';
import PostModel from '../models/Post';
import { pluckId } from '../services/utils';

class TagController {
  static async posts({ posts }: any): Promise<PostSchema[]> {
    return PostModel.find({ _id: { $in: pluckId(posts) } }).exec();
  }
}

export default TagController;
