const apiRouter = require('express').Router()
const bcrypt = require('bcrypt')
const { uuid } = require('uuidv4')

const {
  createProduct,
  getProductById,
  getAllProducts,
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  createOrder,
  getOrdersByProduct,
  getAllOrders,
  getOrderById,
  getCartByUser,
  getOrderProductsById,
  getOrdersByUser,
  getUser,
  addProductsToOrder,
  updateOrderProduct,
  findOrderProductsToDelete,
  updateUser,
  updateOrder,
  cancelOrder,
  completeOrder,
} = require('../db/index')

require('dotenv').config()
const jwt = require('jsonwebtoken')
const { token } = require('morgan')
const { request } = require('express')
const stripe = require('stripe')(`${process.env.REACT_APP_MYSKEY}`)

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

apiRouter.get('/', async (req, res, next) => {
  console.log('hitting api')
  try {
    console.log('inside main page try')
    res.send('Plant Gallerie Main Page')
  } catch (error) {
    next(error)
  }
})

apiRouter.get('/users', async (req, res, next) => {
  try {
    const allUsers = await getAllUsers()
    console.log('api try users', allUsers)
    res.send(allUsers)
  } catch (error) {
    next(error)
  }
})

apiRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  const user = await getUserByUsername(req.body.username)
  console.log('user', user)
  await bcrypt.compare(user.password, req.body.password)
  console.log(password)

  try {
    if (user && user.password && req.body.password == password) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        `${process.env.JWT_SECRET}`,
        {
          expiresIn: '6w',
        },
      )

      delete user.password

      res.send({ token })
    } else {
      throw 'Please re-enter your username and password'
    }
  } catch (error) {
    throw error
  }
})

//this route works - do not edit this code!
apiRouter.post('/register', async (req, res, next) => {
  console.log('here in register')

  const {
    firstName,
    lastName,
    email,
    imageURL,
    username,
    password,
    isAdmin,
  } = req.body
  const hashPassword = await bcrypt.hash(password, 5)
  try {
    const _user = await getUserByUsername(username)
    if (_user) {
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists',
      })
    }
    const user = await createUser({
      firstName,
      lastName,
      imageURL,
      email,
      username,
      password: hashPassword,
    })

    await createOrder({ status: 'created', userId: user.id, products: [] })

    res.send(user)
  } catch (error) {
    next(error)
  }
})

apiRouter.get('/users/me', async (req, res, next) => {
  console.log('inside users/me in database')
  try {
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)

    const decoded = jwt.decode(token, `${process.env.JWT_SECRET}`)

    req.userData = decoded

    const userId = req.userData.id

    const user = await getUserById(userId)

    res.send({ user })
  } catch (error) {
    next(error)
  }
})

apiRouter.get('/users/:id', async (req, res, next) => {
  console.log('getting user by id')
  try {
    console.log('getting user by id inside try')
    const oneUser = await getUserById(req.params.id)
    console.log('user is', oneUser)
    res.send(oneUser)
  } catch (error) {
    next(error)
  }
})

apiRouter.patch('/users/:userId', async (req, res, next) => {
  const { adminId, firstName, lastName, email, username, isAdmin } = req.body
  console.log('the req.body is', req.body)

  //userID is who needs to get patched
  //the adminID needs to be in the body so we can ensure the updater is an admin
  try {
    console.log('hit the update user route, getting userbyID')

    const requestor = await getUserById(adminId)

    if (requestor.isAdmin) {
      const completedUpdate = await updateUser(
        req.params.userId,
        firstName,
        lastName,
        email,
        username,
        isAdmin,
      )
      res.send(completedUpdate)
    } else {
      res.send({
        message: 'You must be an administrator to perform this function',
      })
    }
  } catch (error) {
    throw error
  }
})

apiRouter.get('/products/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    console.log('inside the try for getting product by ID')
    const requestedProduct = await getProductById(id)
    res.send(requestedProduct)
  } catch (error) {
    next(error)
  }
})

apiRouter.post('/createproduct', async (req, res, next) => {
  const { name, description, price, imageURL, inStock, category } = req.body
  console.log('The req.body is', req.body)
  try {
    const newProduct = await createProduct({
      name,
      description,
      price,
      imageURL,
      inStock,
      category,
    })
    res.send(newProduct)
  } catch (error) {
    throw error
  }
})

apiRouter.get('/products', async (req, res, next) => {
  try {
    console.log('inside try for getting all products')
    const allProducts = await getAllProducts()
    res.send(allProducts)
  } catch (error) {
    next(error)
  }
})

apiRouter.get('/products/:productId', async (req, res, next) => {
  const id = req.body.productId
  console.log('the product id is', id)
  try {
    console.log('inside the try for getting product by ID')
    const requestedProduct = await getProductById(id)
    res.send(requestedProduct)
  } catch (error) {
    next(error)
  }
})

apiRouter.get('/orders/cart/:userId', async (req, res, next) => {
  console.log('the userID is', req.params.userId)

  try {
    console.log('beginning get UserById')
    const user = await getUserById(req.params.userId)
    console.log('finished getting user.  the result is', user)
    if (user) {
      const userOrders = await getCartByUser(user.id)
      console.log('the userOrders are', userOrders)
      res.send(userOrders)
    } else {
      res.send({ message: 'there are no orders here' })
    }
  } catch (error) {
    throw error
  }
})

//this route works - do not edit this code!
apiRouter.post('/orders/:orderId/products', async (req, res, next) => {
  const productList = [req.body]

  try {
    const changedOrder = await addProductsToOrder(
      req.params.orderId,
      productList,
    )
    console.log('the changed order is', changedOrder)
    res.send(changedOrder)
  } catch (error) {
    throw error
  }
})

apiRouter.delete('/products/:productId', async (req, res, next) => {
  try {
    console.log('beginning get userbyID')
    const user = await getUserById(req.body.id)
    console.log('the user returned was', user)

    if (user.isAdmin) {
      const deletedProducts = await findOrderProductsToDelete(
        req.params.productId,
      )
      console.log('the deleted products are', deletedProducts)
      res.send(deletedProducts)
    } else {
      res.send({ message: 'You must be an admin to delete products' })
    }
  } catch (error) {
    throw error
  }
})

apiRouter.delete('/order_products/:orderId', async (req, res, next) => {
  try {
    const changedOrder = await destroyOrderProduct(
      req.body.productId,
      req.params.orderId,
    )
    res.send(changedOrder)
  } catch (error) {
    throw error
  }
})

apiRouter.patch('/order_products/:orderId', async (req, res, next) => {
  const { productId, price, quantity } = req.body
  try {
    const updatedOrder = await updateOrderProduct(req.params.orderId, {
      productId,
      price,
      quantity,
    })
    console.log('the updated order is', updatedOrder)
    res.send(updatedOrder)
  } catch (error) {
    throw error
  }
})

apiRouter.get('/orders/:orderId', async (req, res) => {
  try {
    const getOneOrder = await getOrderById(req.params.orderId)
    res.send(getOneOrder)
  } catch (error) {
    throw error
  }
})

apiRouter.post('/orders', async (req, res, next) => {
  try {
    const newOrder = await createOrder(req.body)
    res.send(newOrder)
  } catch (error) {
    next(error)
  }
})

apiRouter.get('/orders', async (req, res) => {
  try {
    const allOrders = await getAllOrders()
    console.log(allOrders)
    res.send(allOrders)
  } catch (error) {
    throw error
  }
})

apiRouter.get('/users/:userId/orders', async (req, res) => {
  console.log('inside getting products by id')
  console.log('this is id', req.params.userId)
  try {
    const orders = await getOrdersByUser(req.params.userId)
    res.send(orders)
  } catch (error) {
    throw error
  }
})

apiRouter.post('/payment', async (req, res) => {
  console.log(req.body)

  try {
    const { grandtotal, token } = req.body
    console.log('this is req.body', req.body)
    console.log('this is total', grandtotal)

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    })

    const idempotencyKey = uuid()
    const charge = await stripe.charges.create(
      {
        amount: grandtotal * 100,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the  products for ${grandtotal}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotencyKey,
      },
    )
    console.log('charge', { charge })

    res.json({
      status: 'success',
    })
  } catch (error) {
    throw error
  }
})

apiRouter.delete('/order_products/:orderProductId', async (req, res, next) => {
  const { orderProductId } = req.params.orderProductId

  try {
    const user = await getUserById(id)
    const userOrder = await getCartByUser(user)
    const orderProduct = await getOrderProductById(orderProductId)

    if (orderProduct.orderId === userOrder.id) {
      const deletedOrderProduct = await destroyOrderProduct(orderProduct.id)
      res.send(deletedOrderProduct)
    } else {
      res.send({ message: 'You must be the owner of this order to delete it' })
    }
  } catch (error) {
    next(error)
  }
})
module.exports = apiRouter
