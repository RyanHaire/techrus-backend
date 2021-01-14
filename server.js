import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
//import cors from 'cors'

const __dirname = dirname(fileURLToPath(import.meta.url))

import productRoutes from './routes/productRoutes.js'


dotenv.config()

connectDB()

const app = express()

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000


if (process.env.NODE_ENV === "production") {
    app.use(express.static(__dirname + "/frontend/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
}

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
