const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const path = require('path')
const { formatBytes } = require('../utils/helper.util')
const { BadRequestError } = require('../errors')

const uploadProductImage = async (req, res) => {
  if (!req.files || !req.files.image) {
    throw new BadRequestError('Please provide product image.')
  }
  const productImage = req.files.image
  const imagePath = path.join(
    __dirname,
    '../localFiles/uploads/',
    productImage.name
  )
  await productImage.mv(imagePath)

  res.status(StatusCodes.OK).json({
    image: `/uploads/${productImage.name}`,
    size: formatBytes(productImage.size)
  })
}

module.exports = {
  uploadProductImage
}
