import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

import productRoutes from './routes/productRoutes.js'


dotenv.config()

connectDB()

const app = express()

if(process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/build')))
}

// app.get('/', (req, res) => {
//     res.send('API is running')
// })

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

if(process.env.NODE_ENV == 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/frontend/build/index.html'))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
