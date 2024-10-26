FROM node:current-slim
COPY . /data
WORKDIR /data
RUN npm install
RUN mkdir /uploads
RUN apt-get update && apt-get install -y tesseract-ocr ghostscript ocrmypdf poppler-utils
ENTRYPOINT npm start
