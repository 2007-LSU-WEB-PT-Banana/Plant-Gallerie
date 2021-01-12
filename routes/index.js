const apiRouter = require('express').Router()

const {
  createProduct,
  getProductById,
  getAllProducts,
  createUser,
  getAllUsers,
  getUserById,
} = require('../db/index')

apiRouter.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

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
  console.log('hitting users api')
  try {
    console.log('hitting users api inside try')
    const allUsers = await getAllUsers()
    console.log('api try users', allUsers)
    res.send(allUsers)
  } catch (error) {
    next(error)
  }
})

apiRouter.post('/users', async (req, res, next) => {
  console.log('hitting users api')
  try {
    console.log('hitting users api inside try')
    const user = await createUser(req.body)
    console.log('api try users', user)
    res.send(user)
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

apiRouter.get('/products', async (req, res, next) => {
  try {
    console.log('inside try for getting all products')
    const allProducts = await getAllProducts()
    res.send(allProducts)
    next()
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
    next()
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
    next()
  } catch (error) {
    throw error
  }
})

module.exports = apiRouter
