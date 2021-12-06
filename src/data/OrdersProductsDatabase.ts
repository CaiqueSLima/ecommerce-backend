import { Order } from "../models/Order"
import { BaseDatabase } from "./BaseDatabase"

export interface OrdersProductsToDB {
    order_id: string
    product_id: number
    quantity: number
}

export class OrdersProductsDatabase extends BaseDatabase {

    private static TABLE_NAME = 'shopper_orders_products'

    public async createProductList(order: Order): Promise<void> {

        const products = order.getProducts()

        for (let product of products) {

            const productToDB: OrdersProductsToDB = {
                order_id: order.getId(),
                product_id: product.id,
                quantity: product.quantity
            }

            await BaseDatabase.connection(OrdersProductsDatabase.TABLE_NAME).insert(productToDB)
        }
    }

}