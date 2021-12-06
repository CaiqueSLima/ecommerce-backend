import { Order } from "../models/Order"
import { BaseDatabase } from "./BaseDatabase"

export interface OrderData {
    id: string,
    costumer_name: string,
    delivery_date: string,
    total_price: number
}

export class OrderDatabase extends BaseDatabase {

    private static TABLE_NAME = 'shopper_orders'

    public async createOrder(order: Order): Promise<void> {

        const orderToDB: OrderData = {
            id: order.getId(),
            costumer_name: order.getCostumerName(),
            delivery_date: order.getDeliveryDate(),
            total_price: order.getTotalPrice()
        }

        await BaseDatabase.connection(OrderDatabase.TABLE_NAME).insert(orderToDB)
    }
}