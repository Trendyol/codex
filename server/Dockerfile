FROM node
WORKDIR /usr/src/server

COPY yarn.lock .
COPY package.json .
RUN yarn

COPY . .
RUN yarn prebuild
RUN yarn build
CMD yarn start

EXPOSE 4000