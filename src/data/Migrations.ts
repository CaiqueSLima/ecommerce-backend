import { CsvToJson } from "../services/CSVToJSON"
import { BaseDatabase } from "./BaseDatabase"

abstract class Migrations extends BaseDatabase {
    public static async main() {
        try {
            await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS shopper_stock (
                    id INT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    price DOUBLE(10,2) NOT NULL,
                    qty_stock INT NOT NULL
                );

            CREATE TABLE IF NOT EXISTS shopper_orders (
                    id VARCHAR(255) PRIMARY KEY,
                    customer_name VARCHAR(255) NOT NULL,
                    total_price DOUBLE(10,2) NOT NULL,
                    delivery_date DATE NOT NULL
                );
            
            CREATE TABLE IF NOT EXISTS shopper_orders_products (
                    order_id VARCHAR(255) NOT NULL,
                    product_id INT NOT NULL,
                    quantity INT NOT NULL,
                    FOREIGN KEY (order_id) REFERENCES shopper_orders(id),
                    FOREIGN KEY (product_id) REFERENCES shopper_stock(id)
                );
            `)

            console.log('Tabelas criadas')

            const products = await CsvToJson.convertFile("./src/data/products_ascii.csv")

            await BaseDatabase.connection('shopper_stock').insert(products)

            console.log('Produtos inseridos')

        } catch (error) {
            console.log(error)
        } finally {
            BaseDatabase.connection.destroy()
        }
    }
}

Migrations.main()