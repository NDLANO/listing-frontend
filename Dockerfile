FROM node:20.13.1-alpine3.18 as builder

ENV HOME=/home/app
ENV APP_PATH=$HOME/listing-frontend

# Copy necessary files for installing dependencies
COPY yarn.lock package.json $APP_PATH/

# Run yarn before src copy to enable better layer caching
WORKDIR $APP_PATH
RUN mkdir -p $APP_PATH/build && yarn

# Copy necessary source files for server and client build
COPY .babelrc postcss.config.js tsconfig.json $APP_PATH/
COPY webpack $APP_PATH/webpack
COPY scripts $APP_PATH/scripts

COPY src $APP_PATH/src
COPY public $APP_PATH/public

# Build client code
RUN yarn run build

# Run stage
FROM node:20.13.1-alpine3.18

ENV HOME=/home/app
ENV APP_PATH=$HOME/listing-frontend
WORKDIR $APP_PATH

RUN npm install -g cross-env bunyan

COPY --from=builder $APP_PATH/build build
COPY --from=builder $APP_PATH/package.json $APP_PATH/

CMD ["yarn", "start-prod"]
