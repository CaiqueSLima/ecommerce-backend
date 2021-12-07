import { Request, Response } from "express"
import { OrderBusiness, OrderInputDTO } from "../business/OrderBusiness"
import { OrderDatabase } from "../data/OrderDatabase"
import { OrdersProductsDatabase } from "../data/OrdersProductsDatabase"
import { ProductsDatabase } from "../data/ProductsDatabase"
import { IdGenerator } from "../services/IdGenerator"

const orderBusiness = new OrderBusiness(
    new IdGenerator(),
    new ProductsDatabase(),
    new OrderDatabase(),
    new OrdersProductsDatabase()
)

export class OrderController {

    public async createOrder(req: Request, res: Response): Promise<void> {

        try {
            
            const order: OrderInputDTO = {
                costumerName: req.body.costumerName,
                deliveryDate: req.body.deliveryDate,
                products: req.body.products
            }

            await orderBusiness.createOrder(order)

            res.status(200).send('Pedido criado com sucesso!')

        } catch (error: any) {
            res.status(error.statusCode).send(error.message)
        }

    }
}