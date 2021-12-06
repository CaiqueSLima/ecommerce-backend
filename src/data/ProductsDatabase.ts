import { Order } from "../models/Order"
import { Product } from "../models/Product"
import { BaseDatabase } from "./BaseDatabase"

export class ProductsDatabase extends BaseDatabase {

    private static TABLE_NAME = 'shopper_stock'

    public async getStock(): Promise<Product[]> {

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