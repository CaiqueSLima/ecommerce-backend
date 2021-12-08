import { Router } from "express"
import { OrderController } from "../controllers/OrderController"

const orderController = new OrderController()

export const orderRouter = Router()

orderRouter.post('/create', orderController.createOrder)