import { CustomError } from "../errors/CustomError"

export interface OrdersProducts {
    id: number
    quantity: number
}

export class Order {
    constructor(
        private id: string,
        private costumerName: string,
        private deliveryDate: string,
        private products: OrdersProducts[]
    ) { }

    public getId = () => this.id
    public getCostumerName = () => this.costumerName
    public getDeliveryDate = () => this.deliveryDate
    public getProducts = () => this.products

    public static checkDate(date: string): string {

        const today = new Date()
        const deliveryDate = new Date(date)

        function addDays(date: Date, days: number): Date {
            let result = date
            result.setDate(date.getDate() + days)
            return result
        }

        if (deliveryDate < addDays(today, 2)) {
            throw new CustomError('Data de entrega deve ser pelo menos 3 dias após o pedido')
        }

        return date
    }

    public static toOrderModel(
        id: string,
        costumerName: string,
        deliveryDate: string,
        products: OrdersProducts[]
    ): Order {
        return new Order(
            id,
            costumerName,
            Order.checkDate(deliveryDate),
            products
        ) 
    }
}