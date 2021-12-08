import { Request, Response } from "express"
import { ProductBusiness } from "../business/ProductBusiness"
import { ProductsDatabase } from "../data/ProductsDatabase"
import { Product } from "../models/Product"

const productBusiness = new ProductBusiness(new ProductsDatabase())

export class ProductsController {

    public async getProducts(req: Request, res: Response): Promise<void> {
        
        try {
            
            const result: Product[] = await productBusiness.getProductsFromStock()

            res.status(200).send({ products: result })

        } catch (error: any) {
            
            res.status(error.statusCode).send({ message: error.message })
        }
    }
}