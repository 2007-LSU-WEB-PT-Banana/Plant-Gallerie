// // Connect to DB
const { Client } = require('pg')
const bcrypt = require('bcrypt')

const DB_NAME = 'plant-gallery'
const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`
const client = new Client(DB_URL, { username: 'postgres' })

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

    const hashPassword = await bcrypt.hash(user.password, 5)

    user.password = hashPassword

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
  INSERT INTO products (name, description, price,"imageURL", "inStock",category)
  VALUES($1,$2,$3,$4,$5,$6)
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

const getProductById = async (productId) => {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    SELECT * 
    FROM products
    WHERE id=$1;
    `,
      [productId],
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

const createOrder = async (status, userId) => {
  try {
    console.log('creating order')
    const {
      rows: [order],
    } = await client.query(
      `
    INSERT INTO orders(status,"userId")
    VALUES($1, $2)
    RETURNING *;
    `,
      [status, userId],
    )
    console.log('making orders')

    order.datePlaced = new Date()
    return order
  } catch (error) {
    throw error
  }
}

const getAllOrders = async () => {
  try {
    const { rows: allOrders } = await client.query(`
    SELECT *
    FROM orders;
    `)
    const orders = await Promise.all(
      allOrders.map((order) => {
        return getOrdersByProduct(order.id)
      }),
    )

    return orders
  } catch (error) {
    throw error
  }
}

const getOrdersByUser = async (userId) => {
  try {
    const { rows: OrderIds } = await client.query(`
    SELECT id
    FROM orders
    WHERE "userId"=${userId};
    `)
    const orders = await Promise.all(
      OrderIds.map((order) => getOrderById(order.id)),
    )
    return orders
  } catch (error) {
    throw error
  }
}

const createProductsOnOrder = async (productId, orderId) => {
  try {
    const { rows: productOrders } = await client.query(
      `
    INSERT INTO order_products("productId","orderId")
    VALUES($1,$2);
    `,
      [productId, orderId],
    )
  } catch (error) {
    throw error
  }
}

const getOrderById = async (orderId) => {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
    SELECT *
    FROM orders
    WHERE id=$1; 
    `,
      [orderId],
    )

    const { rows: products } = await client.query(
      `
    SELECT products.*
    FROM products
    JOIN order_products ON products.id=order_products."productId"
    WHERE order_products."orderId"=$1;
    `,
      [orderId],
    )
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT id, username
    FROM users
    WHERE id=$1;
    `,
      [order.userId], //shouldn't this be order.userId? There is no productID in the users table
    )
    order.products = products
    product.user = user
    delete order.productId //why are we deleting the product IDs?
    return order
  } catch (error) {
    throw error
  }
}

//I don't think this function is going to work. Maybe we should call "getOrderById" below
//instead of getProductById
const getCartByUser = async (userId) => {
  try {
    const { rows: userCart } = await client.query(
      `
    SELECT *
    FROM orders
    WHERE "userId"=$1 AND status='created';
    `,
      [userId],
    )
    const orders = await Promise.all(
      userCart.map((order) => getProductById(order.id)), //this function's parameter calls for the productId not the orderID
    )
    return orders
  } catch (error) {
    throw error
  }
}

const getOrdersByProduct = async (id) => {
  try {
    console.log('hitting query for getting order with product')
    const { rows: orderIds } = await client.query(
      `
    SELECT orders.id 
    FROM orders
    JOIN order_products ON orders.id=order_products."orderId"
    JOIN products ON products.id=order_products."productId"
    WHERE product.id=$1;
    `,
      [id],
    )

    const products = await Promise.all(
      orderIds.map((order) => getOrderById(order.id)),
    )
    return products
  } catch (error) {
    throw error
  }
}

// export
module.exports = {
  client,
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  createProduct,
  getProductById,
  getAllProducts,
  getCartByUser,
  createOrder,
  getOrdersByProduct,
  getAllOrders,
}
