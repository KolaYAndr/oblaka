FROM node:latest



RUN mkdir -p /home/app
ADD . /app/
WORKDIR /app
RUN npm install express
RUN node app.js

ENTRYPOINT [ "/home/app"]

