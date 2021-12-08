import { OrderBusiness } from "../../src/business/OrderBusiness"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { ProductsDatabaseMock } from "../mocks/ProductsDatabaseMock"
import { OrderDatabaseMock } from "../mocks/OrderDatabaseMock"
import { OrdersProductsDatabaseMock } from "../mocks/OrdersProductsDatabaseMock"
import { mockOrderInput } from "../mocks/OrderMock"

const orderBusiness = new OrderBusiness(
    new IdGeneratorMock(),
    new ProductsDatabaseMock(),
    new OrderDatabaseMock(),
    new OrdersProductsDatabaseMock()
)

describe('Unit tests for Order Business', () => {

    test('Testing creating order with a missing costumer name, should return an error', async () => {
        const input = { ...mockOrderInput, costumerName: '' }
        expect.assertions(2)
        try {
            await orderBusiness.createOrder(input)
        } catch (error: any) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toEqual('Parâmetros Inválidos')
        }
    })

    test('Testing creating order with a missing products, should return an error', async () => {
        const input = { ...mockOrderInput, products: [] }
        expect.assertions(2)
        try {
            await orderBusiness.createOrder(input)
        } catch (error: any) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toEqual('Parâmetros Inválidos')
        }
    })

    test('Testing creating order with more products than stock, should return an error', async () => {
        const input = { 
            ...mockOrderInput,
            products: [
                { id: 16, quantity: 1000 },
                { id: 18, quantity: 5 }
            ] 
        }
        expect.assertions(2)
        try {
            await orderBusiness.createOrder(input)
        } catch (error: any) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toEqual('AZEITE PORTUGUÊS EXTRA VIRGEM GALLO 500ML não possui estoque suficiente. Pedido máximo de: 156 unidades')
        }
    })

    test('Testing creating a order successfully, should return nothing', async () => {
        const input = mockOrderInput
        try {
            const result = await orderBusiness.createOrder(input)
            expect(result).toBeUndefined()
        } catch (error) {
            console.log(error)
        }
    })
})