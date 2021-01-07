// code to build and initialize DB goes here
const {
  client,
  createProduct,
  getProductById,
  getAllProducts,
  // other db methods
} = require('./index')

async function buildTables() {
  try {
    client.connect()

    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS order_products CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
  `)

    // build tables in correct order
    console.log('creating tables')

    await client.query(`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price INTEGER NOT NULL,
      "imageURL" TEXT DEFAULT 'no picture' NOT NULL,
      "inStock" BOOLEAN NOT NULL DEFAULT false,
      category TEXT NOT NULL
    );
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "imageURL" TEXT DEFAULT 'no picture' NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) UNIQUE NOT NULL,
        "isAdmin" BOOLEAN NOT NULL DEFAULT false
      );
      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        status VARCHAR(255) DEFAULT 'created',
        "userId" INTEGER REFERENCES users(id),
        "datePlaced" DATE
      );
      CREATE TABLE order_products(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "orderId" INTEGER REFERENCES orders(id),
        price numeric NOT NULL ,
        quantity INTEGER NOT NULL DEFAULT 0
        );
    `)
  } catch (error) {
    throw error
  }
}

async function populateInitialData() {
  try {
    await createProduct({
      name: 'fern',
      description: 'lets plant lets make the earth green',
      price: 12,
      imageURL: '',
      inStock: true,
      category: 'House Plant',
    })

    await createProduct({
      name: 'Money Tree',
      description: 'lets plant lets make the earth green',
      price: 16,
      imageURL: '',
      inStock: true,
      category: 'House Plant',
    })

    // create useful starting data
  } catch (error) {
    throw error
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end())
