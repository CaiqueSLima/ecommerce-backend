import { OrderOutputDTO } from "../business/OrderBusiness"
import { DbAccessError } from "../errors/DbAccessError"
import { Order } from "../models/Order"
import { BaseDatabase } from "./BaseDatabase"

export interface OrderData {
    id: string,
    costumer_name: string,
    delivery_date: string
}

export class OrderDatabase extends BaseDatabase {

    private static TABLE_NAME = 'shopper_orders'

    public async createOrder(order: OrderOutputDTO): Promise<void> {

        try {
    
            await BaseDatabase.connection(OrderDatabase.TABLE_NAME).insert(order)
            
        } catch (error: any) {
            
            throw new DbAccessError(error.message)
        }        
    }
}