FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . /usr/src/app

ENV PORT=7000

EXPOSE 7000

CMD ["npm", "start"]