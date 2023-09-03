# Aggie Reuse Inventory
A web application for Aggie Reuse thrift store to keep track inventory items.

## Demo: 
https://aggie-reuse-inventory-108edb5bada0.herokuapp.com/

![image](https://github.com/zhxu33/Aggie-Reuse-Inventory/assets/77419802/609d7538-0a80-428a-9a14-f7c35f6eb0aa)

## Getting Started:

### Run on local machine
 * Docker: https://www.docker.com/products/docker-desktop
 * Configure proxy to "http://aggie-reuse-api:5000" in server/client/package.json
```
docker compose up
```

### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```
1. Add .env to server
   ```
   cd server
   cd . > .env
   ```
2. Configure environment variables
   ```
   user = user
   password = password
   host = host
   dbport = 5432
   database = aggie_reuse_inventory
   NODE_ENV = production
   ```
3. Install NPM packages
   ```sh
   npm install
   npm install --force --prefix client
   ```
### Usage
 * Configure proxy to "http:localhost:5000" in server/client/package.json
```sh
npm start dev
```




