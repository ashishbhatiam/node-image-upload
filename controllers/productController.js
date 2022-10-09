const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')

const createProduct = async (req, res) => {
  const product = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json(product)
}

const getAllProducts = (req, res) => {
  res.send('Get All Products')
}

module.exports = {
  createProduct,
  getAllProducts
}
