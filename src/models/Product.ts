export class Product {

    constructor(
        private id: number,
        private name: string,
        private price: number,
        private qtyStock: number
    ) { }
    
    public getId = () => this.id
    public getName = () => this.name
    public getPrice = () => this.price
    public getQtyStock = () => this.qtyStock
}