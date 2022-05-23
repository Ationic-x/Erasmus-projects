FROM node:lts-alpine
WORKDIR /usr/src/app
EXPOSE 5000
COPY ./package* ./
RUN npm install
COPY . .
CMD ["node", "app.js"]
