import { OrderDatabase } from "../data/OrderDatabase"
import { OrdersProductsDatabase } from "../data/OrdersProductsDatabase"
import { ProductsDatabase } from "../data/ProductsDatabase"
import { CustomError } from "../errors/CustomError"
import { Order, OrdersProducts } from "../models/Order"
import { IdGenerator } from "../services/IdGenerator"

export interface OrderInputDTO {
    costumerName: string
    deliveryDate: string
    totalPrice: number
    products: OrdersProducts[]
}

export class OrderBusiness {
    
    constructor(
        private idGenerator: IdGenerator,
        private productsDatabase: ProductsDatabase,
        private orderDatabase: OrderDatabase,
        private ordersProductsDatabase: OrdersProductsDatabase
    ) { }

    public async createOrder(order: OrderInputDTO): Promise<void> {

        const { costumerName, deliveryDate, totalPrice, products } = order

        if (!costumerName || !deliveryDate || !totalPrice|| !products.length) {
            throw new CustomError('Parâmetros Inválidos')
        }

        const id = this.idGenerator.generateId()

        const newOrder = new Order(id, costumerName, deliveryDate, totalPrice, products)

        const productsInStock = await this.productsDatabase.getProductsFromOrder(newOrder)

        for (let product of products) {
            
            const match = productsInStock?.find(productInStock => product.id === productInStock.id)

            if (match && match.qty_stock < product.quantity) {
                throw new CustomError(`${match.name} não possui estoque suficiente`)
            }
        }

        await this.orderDatabase.createOrder(newOrder)
        await this.ordersProductsDatabase.createProductList(newOrder)
        await this.productsDatabase.updateStock(newOrder)
    }
}