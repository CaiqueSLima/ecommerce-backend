import { CustomError } from "../error/CustomError"
import { Product } from "../models/Product"
import { ProductsDatabase } from "../data/ProductsDatabase"

export class ProductBusiness {

    constructor(
        private productsDatabase: ProductsDatabase
    ) { }

    public async getProductsFromStock(): Promise<Product[]> {

        const result = await this.productsDatabase.getStock()

        const productsOutput: Product[] = result.map(product => {
            return {
                id: product.id,
                name: product.name,
                price: product.price,
                qtyStock: product.qty_stock
            }
        })

        return productsOutput
    }
}