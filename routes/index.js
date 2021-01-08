const apiRouter = require('express').Router()

const { createProduct, getProductById, getAllProducts } = require('../db/index')

apiRouter.get('/', async (req, res, next) => {
  console.log('hitting api')
  try {
    console.log('inside main page try')
    res.send("Plant Gallerie Main Page")
  } catch (error) {
    next(error)
  }
})

apiRouter.get('/products', async (req, res, next) => {
  try {
    console.log("inside try for getting all products")
    const allProducts = await getAllProducts();
    res.send(allProducts);
    next();
  } catch (error) {
    next(error);
  }
})

apiRouter.get('/products/:productId', async (req, res, next) => {
  const id = req.body.productId
  console.log("the product id is", id);
  try {
    console.log("inside the try for getting product by ID");
    const requestedProduct = await getProductById(id);
    res.send(requestedProduct);
    next();
  } catch (error) {
    next(error);
  }
})

apiRouter.post('/createproduct', async (req, res, next) => {
  const { name, description, price, imageURL, inStock, category } = req.body;
  console.log("The req.body is", req.body)
  try {
    const newProduct = await createProduct({name, description, price, imageURL, inStock, category});
    res.send(newProduct);
    next();
  } catch(error) {
    throw error;
  }
})

module.exports = apiRouter
