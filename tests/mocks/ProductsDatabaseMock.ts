import { BaseDatabase } from "../../src/data/BaseDatabase"
import { ProductData } from "../../src/data/ProductsDatabase"
import { OrdersProducts } from "../../src/models/Order"
import { mockProductsFromDB } from "./ProductsMock"

export class ProductsDatabaseMock {

    public async getProductsFromStock(): Promise<ProductData[]> {
        return mockProductsFromDB
    }

    public async updateStockAfterOrder(products: OrdersProducts[]): Promise<void> {

    }

    public async getProductsFromOrder(products: OrdersProducts[]): Promise<ProductData[] | undefined> {
        return mockProductsFromDB
    }
}