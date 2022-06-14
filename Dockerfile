FROM node:16.13.0
WORKDIR /app
COPY ./package*.json ./
RUN yarn
COPY ./ ./
ARG APP_NAME
ENV APP_NAME=$APP_NAME
#RUN yarn $APP_NAME:build
RUN yarn frontend:build
RUN yarn contracts:build
RUN yarn gateway:build
RUN yarn offers:build
COPY ./libs/infra/src/lib/exporter/fonts ./dist/apps/fonts
CMD yarn $APP_NAME:start

