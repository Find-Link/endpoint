import axios from 'axios';

import { streamToBase64 } from '../services/utils';
import { imgurClientId } from '../config';
import { Post } from '../models/Post.type';
import PostModel from '../models/Post';
import ListLinkModel from '../models/ListLink';
import SourceModel from '../models/Source';
import TagModel from '../models/Tag';
import LinkModel from '../models/Link';

interface NewPost extends Omit<Post, 'thumbnail' | 'tags'> {
  thumbnail: any;
  tags: string[];
}

class PostController {
  static getPosts(parent: any, args: any, context: any): Post[] {
    console.log('hello', parent, args, context);
    return [];
  }

  static async addPost(_parent: any, {
    newPost: {
      title, thumbnail, description, listLinks, sources, tags, category,
    },
  }: { newPost: NewPost }): Promise<any> {
    try {
      const { createReadStream } = await thumbnail;

      const thumbnailData = await streamToBase64(createReadStream);
      const { data: { link: thumbnailLink } } = (await axios.post('https://api.imgur.com/3/image', { image: thumbnailData }, {
        headers: {
          Authorization: `Client-ID ${imgurClientId}`,
        },
      })).data;

      const postDoc = await (new PostModel({
        title,
        thumbnail: thumbnailLink,
        description,
        category,
      })).save();

      await Promise.all(listLinks.map(async ({ title: listLinkTitle, links }) => {
        const listLinkDoc = await (new ListLinkModel({
          title: listLinkTitle,
          post: postDoc._id,
        })).save();

        console.log(links);

        await Promise.all(links.map(async ({ text, link }) => (new LinkModel({
          text,
          link,
          listLink: listLinkDoc._id,
        })).save()));

        return listLinkDoc;
      }));

      await Promise.all(sources.map(async ({ text, link }) => {
        const source = await SourceModel.findOneAndUpdate(
          { text, link },
          {
            $set: { text, link },
            $push: { posts: postDoc._id },
          },
          { new: true, upsert: true, setDefaultsOnInsert: true },
        ).exec();

        return source;
      }));

      await Promise.all(tags.map(async (text) => {
        const tag = await TagModel.findOneAndUpdate(
          { text },
          {
            $set: { text },
            $push: { posts: postDoc._id },
          },
          { new: true, upsert: true, setDefaultsOnInsert: true },
        ).exec();

        return tag;
      }));

      const post = (await PostModel.findById(postDoc._id).exec())!;

      return post;
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}

export default PostController;
