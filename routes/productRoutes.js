const express = require('express')
const productRouter = express.Router()

const {
  createProduct,
  getAllProducts
} = require('../controllers/productController')
const { uploadProductImage } = require('../controllers/uploadsController')

productRouter
  .route('/')
  .post(createProduct)
  .get(getAllProducts)
productRouter.route('/uploads').post(uploadProductImage)

module.exports = productRouter
