# Aggie Reuse Inventory
A web application for Aggie Reuse thrift store to keep track inventory items.

## Demo: 
https://aggie-reuse-inventory-108edb5bada0.herokuapp.com/

![image](https://github.com/zhxu33/Aggie-Reuse-Inventory/assets/77419802/609d7538-0a80-428a-9a14-f7c35f6eb0aa)

## Getting Started:

### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```
1. Add .env in server
2. Configure environment variables
   ```
   user = user
   password = password
   host = host
   dbport = 5432
   database = aggie_reuse_inventory
   NODE_ENV = production
   ```
4. Install NPM packages
   ```sh
   npm install
   npm install --force --prefix client
   ```   
### Usage
```sh
npm start dev
```
### Run on local machine
Download Docker: https://www.docker.com/products/docker-desktop/
```
docker compose up
```





