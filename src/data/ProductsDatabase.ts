import { Product } from "../models/Product"
import { BaseDatabase } from "./BaseDatabase"

export class ProductsDatabase extends BaseDatabase {

    private static TABLE_NAME = 'shopper_stock'

    public async getStock(): Promise<Product[]> {

        return await BaseDatabase.connection(ProductsDatabase.TABLE_NAME).select()

    }
}