import { OrderDatabase } from "../data/OrderDatabase"
import { OrdersProductsDatabase } from "../data/OrdersProductsDatabase"
import { ProductsDatabase } from "../data/ProductsDatabase"
import { CustomError } from "../errors/CustomError"
import { Order, OrdersProducts } from "../models/Order"
import { IdGenerator } from "../services/IdGenerator"

export interface OrderInputDTO {
    costumerName: string
    deliveryDate: string
    products: OrdersProducts[]
}

export interface OrderOutputDTO {
    id: string
    costumerName: string
    deliveryDate: string
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

        const { costumerName, deliveryDate, products } = order

        if (!costumerName || !deliveryDate || !products.length) {
            throw new CustomError('Parâmetros Inválidos')
        }

        const id = this.idGenerator.generateId()

        const newOrder = new Order(id, costumerName, deliveryDate, products)

        const productsInStock = await this.productsDatabase.getProductsFromOrder(newOrder.getProducts())

        for (let product of products) {
            
            const match = productsInStock?.find(productInStock => product.id === productInStock.id)

            if (match && match.qty_stock < product.quantity) {
                throw new CustomError(`${match.name} não possui estoque suficiente`)
            }
        }

        const newOrderToDBs: OrderOutputDTO = {
            id: newOrder.getId(),
            costumerName: newOrder.getCostumerName(),
            deliveryDate: newOrder.getDeliveryDate(),
            products: newOrder.getProducts()
        }

        await this.orderDatabase.createOrder(newOrderToDBs)
        await this.ordersProductsDatabase.createProductList(newOrderToDBs)
        await this.productsDatabase.updateStockAfterOrder(newOrder.getProducts())
    }
}