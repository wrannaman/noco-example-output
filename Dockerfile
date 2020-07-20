FROM node:14-alpine
RUN apk add curl
RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api
COPY . /usr/src/api
RUN chmod +x /usr/src/api/start.sh
ENV ENV=prod
RUN npm install --production
ENV ENV prod
ENV PORT 3001
EXPOSE 3001
RUN npm run docs
CMD [ "/bin/sh", "/usr/src/api/start.sh" ]
