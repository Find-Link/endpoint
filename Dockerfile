FROM node:12-alpine
WORKDIR /endpoint
RUN apk update && apk add wget bash
RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -P /endpoint/sh
RUN chmod +x /endpoint/sh/wait-for-it.sh
COPY package.json .
RUN npm install
EXPOSE 3001
CMD ["npm", "run", "dev"]