import { DbAccessError } from "../errors/DbAccessError"
import { OrdersProducts } from "../models/Order"
import { BaseDatabase } from "./BaseDatabase"

export interface ProductData {
    id: number
    name: string
    price: number
    qty_stock: number
}

export class ProductsDatabase extends BaseDatabase {

    private static TABLE_NAME = 'shopper_stock'

    public async getProductsFromStock(): Promise<ProductData[]> {

        try {

            return await BaseDatabase.connection(ProductsDatabase.TABLE_NAME).where('qty_stock', '>', '0').select()

        } catch (error: any) {

            throw new DbAccessError(error.message)
        }
    }

    public async updateStockAfterOrder(products: OrdersProducts[]): Promise<void> {

        try {

            for (let product of products) {

                await BaseDatabase
                    .connection(ProductsDatabase.TABLE_NAME)
                    .where({ id: product.id })
                    .decrement('qty_stock', product.quantity)
            }

        } catch (error: any) {
            
            throw new DbAccessError(error.message)
        }
    }

    public async getProductsFromOrder(products: OrdersProducts[]): Promise<ProductData[] | undefined> {

        try {

            let ids: number[] = []

            for (let product of products) {

                ids.push(product.id)
            }

            return await BaseDatabase.connection(ProductsDatabase.TABLE_NAME).whereIn('id', ids).select()

        } catch (error: any) {
            
            throw new DbAccessError(error.message)
        }

    }
}