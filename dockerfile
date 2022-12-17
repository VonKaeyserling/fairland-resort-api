FROM node:16-bullseye-slim

USER node

WORKDIR /app/ 

COPY package*.json /app/

RUN npm install --production 

COPY --chown=node:node . .

RUN npx prisma generate

RUN npm run build

CMD ["npm", "start" ]