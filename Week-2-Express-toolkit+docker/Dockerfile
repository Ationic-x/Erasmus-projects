FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package* ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "app.js"]
