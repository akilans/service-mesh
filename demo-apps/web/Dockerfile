FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . /usr/src/app

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]