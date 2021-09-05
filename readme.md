## Engineering Technical Test (Cart)

Instructions
1. Clone this repository (git clone https://github.com/zhakamizhako/NCS_exam1.git)
2. Navigate through the project folder and install dependencies `npm install`
3. Run node server `npm run start`
4. Use a REST API client of your choice. (A YAML export is included for Insomnia REST API)

These are your JSON Patterns that you can use to test the system

```
{
	"products": [
		{"product_id":int, "qty":int},
        ...
		{"product_id":int, "qty":int}
		],
	"promo_code": string
}
```

API
`products` - Array
`promo code` - String

Products structure:
`product_id` - integer
`qty` - integer

Currently, Pricing rules are predefined as an object inside api/controllers/purchaseController.js
```
pricingRules = {
    rules:[
        {id: 1, product_id_rule:1, qty: 3, QtyRule: -1, pricePerItem: null, bundleProductId: null,},
        {id: 2, product_id_rule:3, qty: 3, QtyRule: null, priceQtyRule: null, pricePerItem: 39.90, bundleProductId:null,},
        {id: 3, product_id_rule:2, qty: 1, QtyRule: null, priceQtyRule: null, pricePerItem: null, bundleProductId:4,},
    ],
    promo_codes:[
        {id: 1, promo_code: "I<3AMAYSIM", discountAmount_percentage: 10, type:'all'},
    ]
}
```

Products are also predefined as an object inside api/controllers/operations/ShoppingCart.js
```
products = [
    {product_id:1, code: 'ult_small', name: 'Unlimited 1GB', price: 24.90},
    {product_id:2, code: 'ult_medium', name: 'Unlimited 2GB', price: 29.90},
    {product_id:3, code: 'ult_large', name: 'Unlimited 5GB', price: 44.90},
    {product_id:4, code: '1gb', name: '1 GB Data-pack', price: 9.90},
]
```

The expected return values would be a pattern like this

```
{
  "cart": [
    {
      "product": {
        "product_id": 1,
        "code": "ult_small",
        "name": "Unlimited 1GB",
        "price": 24.9
      },
      "qty": 1,
      "type": "normal"
    },
    ...
    {
      "product": {
        "product_id": 4,
        "code": "1gb",
        "name": "1 GB Data-pack",
        "price": 9.9
      },
      "qty": 1,
      "type": "normal"
    }
  ],
  "total": "$31.32"
}
``
