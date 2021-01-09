// Connect to DB
const { Client } = require('pg')
const DB_NAME = 'plant-gallery'
const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`
const client = new Client(DB_URL)

// database methods

const createUser = async ({
  firstName,
  lastName,
  email,
  imageURL,
  username,
  password,
  isAdmin,
}) => {
  try {
    console.log('creating users')
    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users ("firstName","lastName" ,email,"imageURL", username , password ,"isAdmin")
    VALUES($1,$2,$3,$4,$5,$6,$7)
    RETURNING *; 
    `,
      [firstName, lastName, email, imageURL, username, password, isAdmin],
    )

    return user
  } catch (error) {
    throw error
  }
}

const getAllUsers = async () => {
  console.log('users live here')
  try {
    const { rows: allUsers } = await client.query(`
    SELECT * 
    FROM users;
 `)
    console.log('these are users', allUsers)
    return allUsers
  } catch (error) {
    throw error
  }
}

const getUserById = async (id) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE id=$1;
    `,
      [id],
    )
    return user
  } catch (error) {
    throw error
  }
}

const createProduct = async ({
  name,
  description,
  price,
  imageURL,
  inStock,
  category,
}) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
  INSERT INTO products (name, description, price,"imageURL", "inStock",category )
  VALUES($1, $2,$3,$4,$5,$6)
  RETURNING *;

  `,
      [name, description, price, imageURL, inStock, category],
    )
    return product
  } catch (error) {
    throw error
  }
}

const getAllProducts = async () => {
  try {
    const { rows: allProducts } = await client.query(`
    SELECT * 
    FROM products;
    `)
    return allProducts
  } catch (error) {
    throw error
  }
}

const getProductById = async (id) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    SELECT * 
    FROM products
    WHERE id=$1;

    `,
      [id],
    )
    return product
  } catch (error) {
    throw error
  }
}

// export
module.exports = {
  client,
  // db methods
  createUser,
  getAllUsers,
  getUserById,
  createProduct,
  getProductById,
  getAllProducts,
}
