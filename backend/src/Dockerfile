FROM node:current-slim
COPY ../../src /data
WORKDIR /data
RUN npm install
ENTRYPOINT node index.js
