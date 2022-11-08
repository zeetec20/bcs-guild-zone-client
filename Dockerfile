FROM node:16-alpine

WORKDIR /usr/app/scr
COPY . .

EXPOSE 3000

RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]