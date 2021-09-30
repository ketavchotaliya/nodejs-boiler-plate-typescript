FROM node:12.15.0

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

RUN npm install typescript -g 

COPY . .

RUN npm install pm2 -g

RUN tsc

CMD ["pm2-runtime","--raw","build/server.js","--name=nodejs-typescript-base-structure","--no-daemon"]
