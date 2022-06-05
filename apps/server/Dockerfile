FROM node:18
RUN mkdir /app && chown node:node /app
USER node

WORKDIR /app

EXPOSE 2000
CMD ["yarn", "server:dev:full"]
