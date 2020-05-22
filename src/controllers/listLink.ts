import { LinkSchema } from '../models/Link.type';
import LinkModel from '../models/Link';
import { pluckId } from '../services/utils';

class ListLinkController {
  static async links({ links }: any): Promise<LinkSchema[]> {
    return LinkModel.find({ _id: { $in: pluckId(links) } }).exec();
  }
}

export default ListLinkController;
