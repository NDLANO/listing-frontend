FROM node:10.10.0-alpine as builder

ENV HOME=/home/app
ENV APP_PATH=$HOME/listing-frontend

# Copy necessary files for installing dependencies
COPY yarn.lock package.json $APP_PATH/

# Run yarn before src copy to enable better layer caching
WORKDIR $APP_PATH
RUN mkdir -p $APP_PATH/build && yarn

# Copy necessary source files for server and client build
COPY .babelrc razzle-add-entry-plugin.js razzle.config.js postcss.config.js $APP_PATH/

COPY src $APP_PATH/src
COPY public $APP_PATH/public

# Build client code
RUN yarn run build

# Run stage
FROM node:10.10.0-alpine

ENV HOME=/home/app
ENV APP_PATH=$HOME/listing-frontend
WORKDIR $APP_PATH

RUN npm config set unsafe-perm true
RUN npm install -g cross-env bunyan

COPY --from=builder $APP_PATH/build build
COPY --from=builder $APP_PATH/package.json $APP_PATH/

ENV NODE_ENV=production

CMD ["yarn", "start-prod"]
