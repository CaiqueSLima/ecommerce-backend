import { OrderInputDTO } from "../../src/business/OrderBusiness"

export const mockOrderInput: OrderInputDTO = {
    costumerName: 'Caíque Lima',
    deliveryDate: '15/12/2021',
    products: [
        {
            id: 16,
            quantity: 2
        },
        {
            id: 18,
            quantity: 1
        }
    ]
}