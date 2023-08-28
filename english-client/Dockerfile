FROM node:16-alpine

# App directory
WORKDIR /usr/app/client

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3002

CMD [ "yarn", "dev" ]
