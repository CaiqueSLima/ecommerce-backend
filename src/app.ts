import express from "express"
import cors from "cors"
import { productsRouter } from "./routes/ProductsRouter"

const app = express()

app.use(express.json())
app.use(cors())
app.use('/products', productsRouter)

export default app