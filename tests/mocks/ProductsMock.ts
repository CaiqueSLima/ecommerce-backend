import { ProductData } from "../../src/data/ProductsDatabase"
import { Product } from "../../src/models/Product"

export const mockProductsFromDB: ProductData[] = [
    {
        id: 16,
        name: "AZEITE PORTUGUÊS EXTRA VIRGEM GALLO 500ML",
        price: 20.49,
        qty_stock: 156
    },
    {
        id: 18,
        name: "BEBIDA ENERGÉTICA VIBE 2L",
        price: 8.99,
        qty_stock: 658
    }
]

export const mockProducts: Product[] = [
    new Product(
        16,
        "AZEITE PORTUGUÊS EXTRA VIRGEM GALLO 500ML",
        20.49,
        156
    ),
    new Product(
        18,
        "BEBIDA ENERGÉTICA VIBE 2L",
        8.99,
        658
    )
]