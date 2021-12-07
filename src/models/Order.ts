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

        const day = date.split('/')[0]
        const month = date.split('/')[1]
        const year = date.split('/')[2]
        const formattedDate = year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2)

        const today = new Date()
        const deliveryDate = new Date(formattedDate)

        function addDays(date: Date, days: number): Date {
            let result = date
            result.setDate(date.getDate() + days)
            return result
        }

        if (deliveryDate < addDays(today, 2)) {
            throw new CustomError('Data de entrega deve ser pelo menos 3 dias após o pedido')
        }

        return formattedDate
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