import { CustomError } from "../errors/CustomError"
import { Product } from "../models/Product"
import { ProductsDatabase } from "../data/ProductsDatabase"

export class ProductBusiness {

    constructor(
        private productsDatabase: ProductsDatabase
    ) { }

    public async getProductsFromStock(): Promise<Product[]> {

        const result = await this.productsDatabase.getProductsFromStock()

        const productsOutput: Product[] = result.map(product => new Product(
            product.id,
            product.name,
            product.price,
            product.qty_stock
        ))

        return productsOutput
    }
}