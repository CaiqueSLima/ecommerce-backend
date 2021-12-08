import { ProductBusiness } from "../../src/business/ProductBusiness"
import { ProductsDatabaseMock } from "../mocks/ProductsDatabaseMock"
import { mockProducts } from "../mocks/ProductsMock"

const productBusiness = new ProductBusiness(new ProductsDatabaseMock())

describe('Unit tests for Product Business', () => {

    test('Testing Get products from DB, should return an array of products', async () => {
        try {
            const result = await productBusiness.getProductsFromStock()
            expect(result).toEqual(mockProducts)
        } catch (error) {
            console.log(error)
        }
    })
})