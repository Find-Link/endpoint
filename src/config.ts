import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET || '';
const port = process.env.PORT || 0;

export {
  secret, port,
};
