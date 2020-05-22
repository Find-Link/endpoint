import axios from 'axios';
import { UserInputError } from 'apollo-server';
import { CommentSchema } from '../models/Comment.type';
import { TagSchema } from '../models/Tag.type';
import { SourceSchema } from '../models/Source.type';
import { ListLinkSchema } from '../models/ListLink.type';

import { streamToBase64, pluckId } from '../services/utils';
import { imgurClientId } from '../config';
import { Post, PostSchema } from '../models/Post.type';
import PostModel from '../models/Post';
import ListLinkModel from '../models/ListLink';
import SourceModel from '../models/Source';
import TagModel from '../models/Tag';
import LinkModel from '../models/Link';
import CommentModel from '../models/Comment';

interface NewPost extends Omit<Post, 'thumbnail' | 'tags'> {
  thumbnail: any;
  tags: string[];
}

class PostController {
  static async listLinks({ listLinks }: any): Promise<ListLinkSchema[]> {
    return ListLinkModel.find({ _id: { $in: pluckId(listLinks) } }).exec();
  }

  static async sources({ sources }: any): Promise<SourceSchema[]> {
    return SourceModel.find({ _id: { $in: pluckId(sources) } }).exec();
  }

  static async tags({ tags }: any): Promise<TagSchema[]> {
    return TagModel.find({ _id: { $in: pluckId(tags) } }).exec();
  }

  static async comments({ comments }: any): Promise<CommentSchema[]> {
    return CommentModel.find({ _id: { $in: pluckId(comments) } }).exec();
  }

  static posts(): Promise<PostSchema[]> {
    return PostModel.find({}).exec();
  }

  static async addPost(_parent: any, {
    newPost: {
      title, thumbnail, description, listLinks, sources, tags, category,
    },
  }: { newPost: NewPost }): Promise<PostSchema> {
    try {
      if (listLinks && sources && tags) {
        const { createReadStream } = await thumbnail;

        const thumbnailData = await streamToBase64(createReadStream);
        const { data: { link: thumbnailLink } } = (await axios.post('https://api.imgur.com/3/image', { image: thumbnailData }, {
          headers: {
            Authorization: `Client-ID ${imgurClientId}`,
          },
        })).data;

        const postModel = new PostModel({
          title,
          thumbnail: thumbnailLink,
          description,
          category,
        });

        const postDoc = await postModel.save();

        const listLinkDocs = await Promise.all(listLinks.map(async ({ title: listLinkTitle, links }) => {
          const listLinkDoc = await (new ListLinkModel({
            title: listLinkTitle,
            post: postDoc._id,
          })).save();

          await Promise.all(links.map(async ({ text, link }) => (new LinkModel({
            text,
            link,
            listLink: listLinkDoc._id,
          })).save()));

          return listLinkDoc;
        }));

        const sourceDocs = await Promise.all(sources.map(async ({ text, link }) => {
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

        const tagDocs = await Promise.all(tags.map(async (text) => {
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

        postModel.listLinks = pluckId(listLinkDocs);
        postModel.sources = pluckId(sourceDocs);
        postModel.tags = pluckId(tagDocs);
        await postModel.save();

        return postDoc;
      }
      throw new UserInputError('Form Arguments invalid');
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}

export default PostController;
