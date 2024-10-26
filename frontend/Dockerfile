FROM node:current-slim
COPY . /data
WORKDIR /data
RUN npm install
RUN npm run build
EXPOSE 3001
ENTRYPOINT npm run preview
