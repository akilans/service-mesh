FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . /usr/src/app

ENV PORT=5000

EXPOSE 5000

CMD ["npm", "start"]