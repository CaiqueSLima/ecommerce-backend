import { Order } from "../models/Order"
import { BaseDatabase } from "./BaseDatabase"

export interface ProductData {
    id: number
    name: string
    price: number
    qty_stock: number
}

export class ProductsDatabase extends BaseDatabase {

    private static TABLE_NAME = 'shopper_stock'

    public async getStock(): Promise<ProductData[]> {

        return await BaseDatabase.connection(ProductsDatabase.TABLE_NAME).select()
    }

    public async updateStock(order: Order): Promise<void> {

        const products = order.getProducts()

        for (let product of products) {

            await BaseDatabase
                .connection(ProductsDatabase.TABLE_NAME)
                .where({ id: product.id })
                .decrement('qty_stock', product.quantity)
        }
    }
}