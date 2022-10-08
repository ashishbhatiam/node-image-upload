const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')

const uploadProductImage = (req, res) => {
  res.send('Upload Product Image')
}

module.exports = {
  uploadProductImage
}
