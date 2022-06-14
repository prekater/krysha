FROM node:16.13.0
WORKDIR /app
COPY ./package*.json ./
RUN yarn
COPY ./ ./
ARG APP_NAME
ENV APP_NAME=$APP_NAME
RUN yarn $APP_NAME:build
CMD yarn start:$APP_NAME

