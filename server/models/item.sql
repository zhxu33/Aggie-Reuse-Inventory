CREATE DATABASE aggie_reuse_inventory;

CREATE TABLE items(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  category VARCHAR(100),
  description VARCHAR(255),
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

#\l
#\c
#\dt