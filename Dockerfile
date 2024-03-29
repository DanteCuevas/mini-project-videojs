FROM node:14.17

WORKDIR /app

COPY . .
     
RUN npm install

CMD ["npm", "run", "serverless"]