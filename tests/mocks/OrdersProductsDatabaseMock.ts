import { OrderOutputDTO } from "../../src/business/OrderBusiness"

export class OrdersProductsDatabaseMock {

    private static TABLE_NAME = 'shopper_orders_products'

    public async createProductList(order: OrderOutputDTO): Promise<void> {

    }
}