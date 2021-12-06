import { OrderDatabase } from "../data/OrderDatabase"
import { OrdersProductsDatabase } from "../data/OrdersProductsDatabase"
import { CustomError } from "../error/CustomError"
import { OrdersProducts } from "../models/Order"
import { IdGenerator } from "../services/IdGenerator"
import { ProductBusiness } from "./ProductBusiness"

export interface OrderInputDTO {
    costumerName: string
    deliveryDate: string
    totalPrice: number
    products: OrdersProducts[]
}

export class OrderBusiness {
    
    constructor(
        private idGenerator: IdGenerator,
        private productBusiness: ProductBusiness,
        private orderDatabase: OrderDatabase,
        private ordersProductsDatabase: OrdersProductsDatabase
    ) { }

    public async createOrder(order: OrderInputDTO): Promise<void> {

        const { costumerName, deliveryDate, totalPrice, products } = order

        if (!costumerName || !deliveryDate || !totalPrice|| !products.length) {
            throw new CustomError('Parâmetros Inválidos')
        }

        const productsInStock = await this.productBusiness.getProductsFromStock()

        for (let product of products) {
            for (let stockProduct of productsInStock) {
                if (product.id === stockProduct.getId()) {
                    if (product.quantity > stockProduct.getQtyStock()) {
                        throw new CustomError(`${stockProduct.getName()} não possui estoque suficiente`)
                    }
                }
            }
        }

        

    }
}