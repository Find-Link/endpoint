import ListLinkModel from '../models/ListLink';
import { ListLinkSchema } from '../models/ListLink.type';

class LinkController {
  static async listLink({ listLink }: any): Promise<ListLinkSchema | null> {
    return ListLinkModel.findById(listLink).exec();
  }
}

export default LinkController;
