FROM node
WORKDIR /usr/src/client

COPY yarn.lock .
COPY package.json .
RUN yarn

COPY . .
RUN yarn build
CMD yarn start

EXPOSE 3000