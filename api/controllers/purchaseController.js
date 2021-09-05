'use strict';
const ShoppingCart = require('./operations/ShoppingCart')

// JSON Request format:
/*
{
    "products": [
        {"product_id":"1", "qty":3},
        {"product_id":"2", "qty":3}
    ],
	"promo_code": "I<3AMAYSIM"
}
*/

//Assuming that we have this in our DB
let pricingRules = {
    rules:[
        {id: 1, product_id_rule:1, qty: 3, QtyRule: -1, pricePerItem: null, bundleProductId: null,},
        {id: 2, product_id_rule:3, qty: 3, QtyRule: null, priceQtyRule: null, pricePerItem: 39.90, bundleProductId:null,},
        {id: 3, product_id_rule:2, qty: 1, QtyRule: null, priceQtyRule: null, pricePerItem: null, bundleProductId:4,},
    ],
    promo_codes:[
        {id: 1, promo_code: "I<3AMAYSIM", discountAmount_percentage: 10, type:'all'},
    ]
}

exports.addToCart = function(req, res) {
    // console.log(req.body)
    console.log('---Transaction--------------')
    let { products, promo_code} = req.body

    if(!products || (!products.length)){
        res.status(400).send({message: "Invalid request."})
        res.end()
        return
    }
    let cart = new ShoppingCart()
    cart.new(pricingRules)
    for(var x=0;x<products.length;x++){
        let test = cart.add(products[x], promo_code)
        if(!test){
            let error = cart.getError()
            res.status(400).send({message: error})
            console.log(error)
            res.end()
            // break;
            return
        }
    }

    console.log('Items')
    console.log('-------------------------------')

    console.log(cart.items)
    console.log('-------------------------------')

    console.log('cartObject')
    console.log('-------------------------------')
    console.log(cart)
    console.log('-------------------------------')

    res.json({
        cart: cart.items,
        total: `$${parseFloat(cart.total).toFixed(2)}`
    })
    res.end()
  };

// exports.AddPricingRule = function (req, res){
//     let {product_id_rule, qty, QtyRule, pricePerItem, bundleProductId} = req.body

//     if (!product_id_rule){
//         res.status(400).send({message: "Invalid request."})
//         res.end()
//         return
//     }
// }

// exports.removePricingRule = function (req, res){
//     let {id} = req.body

//     if(!id){
//         res.status(400).send({message: "Invalid request."})
//         res.end()
//         return
//     }
// }