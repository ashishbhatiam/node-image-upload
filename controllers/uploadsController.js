const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const path = require('path')
const { formatBytes } = require('../utils/helper.util')
const { BadRequestError } = require('../errors')

const uploadProductImage = async (req, res) => {
  if (!req.files || !req.files.image) {
    throw new BadRequestError('No file Uploaded.')
  }
  const productImage = req.files.image
  if (!productImage.mimetype.startsWith('image')) {
    throw new BadRequestError('Please Upload Image type file.')
  }

  const maxSize = 1024 * 2048
  if (productImage.size > maxSize) {
    throw new BadRequestError(
      `Please Upload Image smaller than ${formatBytes(maxSize)}.`
    )
  }

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
