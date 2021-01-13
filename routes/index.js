const apiRouter = require('express').Router()

const {
  createProduct,
  getProductById,
  getAllProducts,
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  requireUser,
  requireActiveUser,
} = require('../db/index')

require('dotenv').config()
const jwt = require('jsonwebtoken')

apiRouter.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
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

apiRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  // request must have both
  if (!username || !password) {
    next({
      name: 'MissingCredentialsError',
      message: 'Please supply both a username and password',
    })
  }

  try {
    const user = await getUserByUsername(username)
    console.log(user.id)

    if (user && user.password == password) {
      // create token & return to user
      res.send({
        message: "you're logged in!",
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGJlcnQiLCJpYXQiOjE2MDc2NTQzNTR9.p-RxeCLsZlUncNqNlKdProbc68gvNSTeucy9UwjO8CE',
      })
    } else {
      next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect',
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

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

  console.log('here in register 1')
  console.log(req.body, 'this is body')

  try {
    console.log('here in register 6')
    const _user = await getUserByUsername(username)
    console.log(_user, 'this is user')

    if (_user) {
      console.log('inside user try')
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists',
      })
    }
    console.log('here in register 7')
    const user = await createUser({
      firstName,
      lastName,
      email,
      imageURL,
      username,
      password,
      isAdmin,
    })

    console.log('this is user', user)
    console.log('this is user id', user.id)
    console.log('this is username', user.username)

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      `${process.env.JWT_SECRET}`,
      {
        expiresIn: '4w',
      },
    )
    console.log('this is token ', token)
    console.log('here in register 18')
    res.send({
      message: 'thank you for signing up',
      token,
    })
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

apiRouter.get('/orders/cart', async (req,res,next) => {
  //const id = req.body.id;
  //need to confirm if this will be user id 
try {
  if(id) {
    const user = await getUserById(id)
  } if (user) {
    const userOrders = await getCartByUser({id})
    res.send( userOrders)
  }else{
    res.send({message: 'there are no orders here'})
  }

  }catch(error){
    throw(error)
  }

});

apiRouter.post('/orders', async (req,res,next) =>{

  try{
    if(id) {
      const newOrder = await createOrder({userId: id})
      res.send(newOrder)
    } else {
      res.send({message:'You must be logged in to create an order'})
      }
  }catch(error){
    throw(error)
  }

})



module.exports = apiRouter
