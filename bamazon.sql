-- -- Drops the bamazon_db if it exists currently --
-- DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "products" within bamazon_db --
CREATE TABLE products (
  -- Makes a string column called "item_id" which cannot contain null --
  item_id VARCHAR(30) AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "product_name" which cannot contain null --
  product_name VARCHAR(30) NOT NULL,
  -- Makes a sting column called "department_name" --
  department_name VARCHAR(30),
  -- Makes an numeric column called "price" --
  price DECIMAL(8, 2),
   -- Makes an numeric column called "stock_quantity" --
  stock_quantity INTEGER(10)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("skirt", "clothing", 49.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("purse", "accessories", 105.00, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shoe", "shoes", 45.00, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dress", "clothing", 74.99, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sunglasses", "accessories", 24.99, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("wallet", "accessories", 78.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tie", "accessories", 30.00, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pants", "clothing", 39.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("earrings", "jewelry", 89.50, 2);