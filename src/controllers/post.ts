import FormData from 'form-data';
import axios from 'axios';

import { authenticate } from '../services/auth';
import Post from '../models/Post';
import { Post } from '../models/Post.type';
import { streamToBase64 } from '../services/utils';
import { imgurClientId } from '../config';
import ListLink from '../models/ListLink';

interface Controller {
  getPost(): IPost;
}

class PostController {
  static getPosts(parent: any, args: any, context: any): PostSchema[] {
    console.log('hello', parent, args, context);
    return [];
  }

  static async addPost(_parent: any, {
    newPost: {
      title, thumbnail, description, listLinks, sources, tags, category,
    },
  }: any): Promise<any> {
    try {
      const { createReadStream } = await thumbnail;

      const thumbnailData = await streamToBase64(createReadStream);
      const { data: { link } } = (await axios.post('https://api.imgur.com/3/image', { image: thumbnailData }, {
        headers: {
          Authorization: `Client-ID ${imgurClientId}`,
        },
      })).data;

      const { _id } = await (new Post({
        title,
        thumbnail: link,
        description,
        category,
      })).save();

      listLinks.forEach(() => {

      });
    } catch (e) {
      console.error(e.response);
      return e;
    }
  }
}

export default PostController;
