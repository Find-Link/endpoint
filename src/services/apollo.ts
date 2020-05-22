import { postDefs, postResolvers } from '../models/Post.type';
import { commentDefs } from '../models/Comment.type';
import { linkDefs } from '../models/Link.type';
import { listLinkDefs } from '../models/ListLink.type';
import { userDefs } from '../models/User.type';
import { sourceDefs } from '../models/Source.type';
import { tagDefs } from '../models/Tag.type';

const typeDefs = [commentDefs, linkDefs, listLinkDefs, postDefs, tagDefs, sourceDefs, userDefs];
const resolvers = [postResolvers];

export { typeDefs, resolvers };
