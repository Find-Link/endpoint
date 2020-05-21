import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET || '';
const port = process.env.PORT || 0;
const imgurClientId = process.env.IMGUR_CLIENT_ID || '';
const mongoURL = process.env.MONGO_URL || '';

export {
  secret, port, imgurClientId, mongoURL,
};
