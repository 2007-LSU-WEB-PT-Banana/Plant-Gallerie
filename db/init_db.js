// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
   await client.query(`
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS orders_products;
  `);

    
    // build tables in correct order

    await client.query(`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name varchar(255) NOT NULL,
      description varchar(255) NOT NULL,
      price numeric NOT NULL,
      "imageURL" DEFAULT  "no image"
      "inStock" NOT NULL DEFAULT false,
      category varchar(255) NOT NULL
    );

    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      "firstName" varchar(255) NOT NULL,
      "lastName" varchar(255) NOT NULL,
      email UNIQUE NOT NULL,
      "imageURL" DEFAULT "no image",
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) UNIQUE NOT NULL,
      "isAdmin" NOT NULL DEFAULT false
    );

    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      status varchar(255) DEFAULT "created"
      "userId" REFERENCES users(id),
      "datePlaced" date
      );

      CREATE TABLE orders_products(
        id SERIAL PRIMARY KEY,
        "productId" REFERENCES products(id),
        "orderId" REFERENCES orders(id),
        price numeric NOT NULL,
        quantity NOT NULL DEFAULT 0
      );

    
    `);
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());