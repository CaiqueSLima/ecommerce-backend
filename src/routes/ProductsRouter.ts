import { Router } from "express"
import { ProductsController } from "../controllers/ProductsController"

const productsController = new ProductsController()

export const productsRouter = Router()

productsRouter.get('/', productsController.getProducts)