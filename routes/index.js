const apiRouter = require('express').Router()

const { createProduct, getProductById, getAllProducts } = require('../db/index')

apiRouter.get('/', async (req, res, next) => {
  console.log('hitting api')
  try {
    console.log('inside try getting all products')
    const allProducts = await getAllProducts()
    res.send(allProducts)
  } catch (error) {
    next(error)
  }
})

module.exports = apiRouter
