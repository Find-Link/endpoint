import { postDefs, postResolvers } from '../models/Post.type';
import { commentDefs, commentResolvers } from '../models/Comment.type';
import { linkDefs, linkResolvers } from '../models/Link.type';
import { listLinkDefs, listLinkResolvers } from '../models/ListLink.type';
import { userDefs } from '../models/User.type';
import { sourceDefs, sourceResolvers } from '../models/Source.type';
import { tagDefs, tagResolvers } from '../models/Tag.type';

const typeDefs = [commentDefs, linkDefs, listLinkDefs, postDefs, tagDefs, sourceDefs, userDefs];
const resolvers = [commentResolvers, linkResolvers, listLinkResolvers, postResolvers, sourceResolvers, tagResolvers];

export { typeDefs, resolvers };
