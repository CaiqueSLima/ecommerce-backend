import { OrderOutputDTO } from "../business/OrderBusiness"
import { DbAccessError } from "../errors/DbAccessError"
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

            const orderToDB: OrderData = {
                id: order.id,
                costumer_name: order.costumerName,
                delivery_date: order.deliveryDate
            }
    
            await BaseDatabase.connection(OrderDatabase.TABLE_NAME).insert(orderToDB)
            
        } catch (error: any) {
            
            throw new DbAccessError(error.message)
        }        
    }
}