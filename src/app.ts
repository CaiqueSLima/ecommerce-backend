import express from "express"
import cors from "cors"
import { productsRouter } from "./routes/ProductsRouter"
import { orderRouter } from "./routes/OrderRouter"

const app = express()

app.use(express.json())
app.use(cors())
app.use('/products', productsRouter)
app.use('/orders', orderRouter)

export default app