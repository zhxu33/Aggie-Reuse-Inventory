FROM node:14

WORKDIR /app

COPY . .

RUN npm install

RUN npm install --force --prefix client 

RUN npm run --prefix client build 

EXPOSE 5000

CMD ["npm", "start"]

#add .env
#user = user
#password = password
#host = connection_link
#dbport = 5432
#database = database_name
#NODE_ENV = production

#build test
#docker build -t aggie-reuse-inventory .
#docker run -it -p 5000:5000 aggie-reuse-inventory

#deployment
#heroku login
#heroku container:login
#heroku container:push --recursive -a aggie-reuse-inventory
#heroku container:release -a aggie-reuse-inventory web
#heroku open --app aggie-reuse-inventory