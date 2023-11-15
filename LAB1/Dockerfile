FROM node:20-alpine
WORKDIR /app
MAINTAINER pashtet

ENV MONGO_DB_USERNAME=admin \ 
    MONGO_DB_PWD=password

RUN mkdir -p /home/app && \
    npm install express

COPY . /home/app

CMD ["node", "app.js"]