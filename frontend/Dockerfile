FROM node:current-slim
COPY package.json package-lock.json /data/
WORKDIR /data
RUN npm install
COPY . /data/
RUN npm run build
EXPOSE 3001
ENTRYPOINT npm run preview
