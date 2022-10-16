const express = require('express')
const productRouter = express.Router()

const {
  createProduct,
  getAllProducts,
  createProductLocal
} = require('../controllers/productController')

productRouter
  .route('/')
  .post(createProduct)
  .get(getAllProducts)
productRouter.route('/local').post(createProductLocal)

module.exports = productRouter
