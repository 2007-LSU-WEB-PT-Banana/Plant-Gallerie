// // Connect to DB
const { Client } = require('pg')
// const { delete } = require('../routes')
const DB_NAME = 'plant-gallery'
const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`
const client = new Client(DB_URL, {username: "postgres"})


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
    INSERT INTO users("firstName","lastName" ,email,"imageURL", username , password ,"isAdmin")
    VALUES($1,$2,$3,$4,$5,$6,$7)
    RETURNING *; 
    `,
      [firstName, lastName, email, imageURL, username, password, isAdmin],
    )
    console.log('user created', user)
    return user
  } catch (error) {
    console.log('cant create user')
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
    allUsers.map((user) => {
      return delete user.password
    })
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
    delete user.password
    return user
  } catch (error) {
    throw error
  }
}

const getUserByUsername = async (username) => {
  console.log('inside db')
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users 
    WHERE username=$1;
    `,
      [username],
    )
    console.log('required user is ', user)

    console.log('existing user by user function')
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
    const { rows: productIds } = await client.query(`
    SELECT id 
    FROM products;
    `)

    const allProducts = await Promise.all(
      productIds.map((product) => getProductById(product.id)),
    )

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

    if (!product) {
      throw {
        message: 'Could not find a product with that name/id',
      }
    }

    return product
  } catch (error) {
    throw error
  }
}

const getCartByUser = async ({id}) => {

  try{
      const {rows: [cartOrder] } = await client.query(`
          SELECT * FROM orders 
          WHERE "userId"=$1 AND status='created'
      `,[id])

    
      return cartOrder


  }catch(error){
      console.log(error)
  }

}

const createOrder = async ({status='created', userId})=>{
  try {
   
      const {rows: [order]} = await client.query(`
      INSERT INTO orders(status, "userId", "datePlaced") 
      VALUES ($1, $2, $3)
      RETURNING *
      `, [status, userId, date])

      return order
   
  } catch (error) {
      console.error(error)
  }
}


const requireUser = (req, res, next) => {
  if (!req.user) {
    next({
      name: 'MissingUserError',
      message: 'You must be logged in to perform this action',
    })
  }

  next()
}

const requireActiveUser = (req, res, next) => {
  if (!req.user.active) {
    next({
      name: 'UserNotActive',
      message: 'You must be active to perform this action',
    })
  }
  next()
}

// export
module.exports = {
  client,
  // db methods
  requireUser,
  requireActiveUser,
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  createProduct,
  getProductById,
  getAllProducts,
  getCartByUser,
  createOrder,
}
