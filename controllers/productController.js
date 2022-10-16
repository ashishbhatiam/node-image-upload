const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const { formatBytes } = require('../utils/helper.util')
const { BadRequestError } = require('../errors')
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const path = require('path')

const createProductLocal = async (req, res) => {
  const { name, price: strPrice } = req.body
  const price = Number(strPrice)
  // Initial validation
  if (!name || !price || !req.files || !req.files.image) {
    throw new BadRequestError('Please provide name, price and image file')
  }
  const productImage = req.files.image
  // File type validation
  if (!productImage.mimetype.startsWith('image')) {
    throw new BadRequestError('Please upload Image type file.')
  }

  // File size validation
  const maxSize = 1024 * 2048
  if (productImage.size > maxSize) {
    throw new BadRequestError(
      `Please Upload Image smaller than ${formatBytes(maxSize)}.`
    )
  }

  // Creating local file
  const imageUrl = path.join(
    __dirname,
    '../localFiles/uploads/',
    productImage.name
  )
  await productImage.mv(imageUrl)

  const payload = {
    name,
    price,
    image: `/localFiles/uploads/${productImage.name}`
  }
  // Product create API call
  const product = await Product.create(payload)
  res.status(StatusCodes.CREATED).json(product)
}

const createProduct = async (req, res) => {
  const { name, price: strPrice } = req.body
  const price = Number(strPrice)
  // Initial validation
  if (!name || !price || !req.files || !req.files.image) {
    throw new BadRequestError('Please provide name, price and image file')
  }
  const productImage = req.files.image
  // File type validation
  if (!productImage.mimetype.startsWith('image')) {
    throw new BadRequestError('Please upload Image type file.')
  }

  // File size validation
  const maxSize = 1024 * 2048
  if (productImage.size > maxSize) {
    throw new BadRequestError(
      `Please Upload Image smaller than ${formatBytes(maxSize)}.`
    )
  }

  // Creating temp file
  const imagePath = path.join(__dirname, '../tmp/', productImage.name)
  await productImage.mv(imagePath)

  // Upload API call
  const result = await cloudinary.uploader.upload(imagePath, {
    use_filename: true,
    folder: 'product-upload-api'
  })

  // Unlink/Removing temp file
  fs.unlinkSync(imagePath)

  const payload = {
    name,
    price,
    image: result.secure_url
  }
  // Product create API call
  const product = await Product.create(payload)
  res.status(StatusCodes.CREATED).json(product)
}

const getAllProducts = async (req, res) => {
  const products = await Product.find({}).sort('-createdAt')
  res.status(StatusCodes.OK).json({ products, count: products.length })
}

module.exports = {
  createProduct,
  getAllProducts,
  createProductLocal
}
