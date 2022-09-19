FROM node:16.17-alpine as builder

ENV HOME=/home/app
ENV APP_PATH=$HOME/listing-frontend

# Copy necessary files for installing dependencies
COPY yarn.lock package.json $APP_PATH/

# Run yarn before src copy to enable better layer caching
WORKDIR $APP_PATH
RUN mkdir -p $APP_PATH/build && yarn

# Copy necessary source files for server and client build
COPY .babelrc razzle.config.js postcss.config.js tsconfig.json $APP_PATH/

COPY src $APP_PATH/src
COPY public $APP_PATH/public

# Build client code
RUN yarn run build

# Run stage
FROM node:16.17-alpine

ENV HOME=/home/app
ENV APP_PATH=$HOME/listing-frontend
WORKDIR $APP_PATH

RUN npm config set unsafe-perm true
RUN npm install -g cross-env bunyan

COPY --from=builder $APP_PATH/build build
COPY --from=builder $APP_PATH/package.json $APP_PATH/

CMD ["yarn", "start-prod"]
