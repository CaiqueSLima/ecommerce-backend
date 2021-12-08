# Shopper Backend

## Install

```sh
npm install
```

## Run Migrations

```sh
npm run migrations
```

## Run Dev

```sh
npm run dev
```

## Run Test

```sh
npm run test
```

## Run Start

```sh
npm start
```

## ENDPOINTS

 ### Get Products from stock
  * Method: GET
  * Path: `/products`
  * Response: (Return only products with more than 0 stock)
  ```
  {
      "products": [
           {
              "id": "16",
              "name": "AZEITE PORTUGUÊS EXTRA VIRGEM GALLO 500ML",
              "price": 20.49,
              "qtyStock": 156
          },
       ...
      ]
   }
```

### Create Order
  * Method: POST
  * Path: `/order/create`
  * Body: (All fields are mandatory)
  ```
  {
    "costumerName":  "Caíque Lima",
    "deliveryDate": "11/12/2021",
    "products": [
        {
            "id": 16,
            "quantity": 2
        },
        {
            "id": 18,
            "quantity": 1
        }
     ]
  }
```
