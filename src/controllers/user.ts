import { pluckId } from '../services/utils';
import CommentModel from '../models/Comment';
import { CommentSchema } from '../models/Comment.type';

class UserController {
  static async comments({ comments }: any): Promise<CommentSchema[]> {
    return CommentModel.find({ _id: { $in: pluckId(comments) } }).exec();
  }
}

export default UserController;
