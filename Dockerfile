FROM node:10.10.0-alpine

ENV HOME=/home/app
ENV APP_PATH=$HOME/listing-frontend

# Copy necessary files for installing dependencies
COPY yarn.lock package.json $APP_PATH/

# Run yarn before src copy to enable better layer caching
WORKDIR $APP_PATH
RUN mkdir -p $APP_PATH/build && \
    yarn

# Copy necessary source files for server and client build
COPY .babelrc razzle-add-entry-plugin.js razzle.config.js postcss.config.js $APP_PATH/

COPY src $APP_PATH/src
COPY style $APP_PATH/style
COPY server $APP_PATH/server

# Build client code
WORKDIR $APP_PATH
RUN yarn run build
CMD ["yarn", "start-prod"]
