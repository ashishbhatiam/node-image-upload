require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const expressFileUpload = require('express-fileupload')

// Cloudinary v2
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.CLOUD_API_SECRET
})

// connectDB
const connectDB = require('./db/connect')

// router
const productRouter = require('./routes/productRoutes')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.static('./localFiles'))
app.use(express.json())
app.use(expressFileUpload())

// Route Path Middleware
app.use('/api/v1/products', productRouter)

// Custom middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5001

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)

    app.listen(port, () => console.log(`Server is listening on PORT: ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
