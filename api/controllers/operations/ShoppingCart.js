//Assuming this is our DB object.
let products = [
    {product_id:1, code: 'ult_small', name: 'Unlimited 1GB', price: 24.90},
    {product_id:2, code: 'ult_medium', name: 'Unlimited 2GB', price: 29.90},
    {product_id:3, code: 'ult_large', name: 'Unlimited 5GB', price: 44.90},
    {product_id:4, code: '1gb', name: '1 GB Data-pack', price: 9.90},
]

class ShoppingCart{
    constructor(params){
        this.total = 0.00
        this.items = []
        this.rules= null;
        this.promo_codes = null;
        this.error = null
        this.hasDiscount = false
    }

    getError(){
        return this.error;
    }

    new(rules){
        this.rules = rules.rules
        this.promo_codes = rules.promo_codes
        return this;
    }

    add(item, promo_code) {
        let found = -1;
        let foundDiscount = -1;
        let foundProductRule = -1;
        let total = 0;
        let costItem = 0;
        let discountValue = 0;
        let qtyMinus = 0;

        //find item
        products.map((entry, index) => {if(entry.product_id === item.product_id) found = index})

        if(found===-1){
            this.error = {error: "Item not found", product_id: item.product_id, input: item}
            // console.log('item not found')
            return false;
        }else{
            costItem = products[found].price;
            console.log('--------Item found--------------')
            console.log(products[found])
        }

        //find discount
        this.promo_codes.map((entry, index) => {if(entry.promo_code === promo_code) foundDiscount = index})

        if(foundDiscount===-1){
            console.log('discount code not found')
            console.log(promo_code)
        }else{
            this.hasDiscount = true;
            discountValue = (products[found].price * this.promo_codes[foundDiscount].discountAmount_percentage) / 100
        }


        //parse product rules
        // let prePrice = this.parseRules()

        console.log('try product rules :::::')

        this.rules && this.rules.map((entry, index)=>{ if(entry.product_id_rule === products[found].product_id) foundProductRule = index })
        if(foundProductRule===-1){
            console.log('product rule not found')
        }else{
            let rule =  this.rules[foundProductRule];
            console.log(rule)
            //parse
            if(item.qty >= rule.qty){
                let count = Math.floor(item.qty/rule.qty)
                // let countMinus = 

                if(rule.QtyRule!=null){
                    console.log('QTYrule found')
                    qtyMinus = products[found].price * count;
                    console.log('qty minus')
                    console.log(qtyMinus)
                }
                if(rule.pricePerItem!=null){
                    costItem = rule.pricePerItem;
                }
                if(rule.bundleProductId!=null){
                    //find item
                    // let indexF = -1;
                    products.map((entry, index)=> {if(entry.product_id === rule.bundleProductId) {
                        this.items.push({
                            product: products[index],
                            qty: count,
                            type: 'free'
                        })
                        console.log('added free item')
                    }})
                    // this.items.push({
                    // })
                }
            }
        }

        console.log('-------------------------------')


        // costItem = products[found].price
        //parse totals
        total = item.qty * (costItem - discountValue) - qtyMinus;
        this.total = this.total + total;

        //return item
        this.items.push({
            product: products[found],
            qty: item.qty,
            type: 'normal'
        })
        return this.items;
    }

    // parseRules(item){
    //     let found = -1
    //     this.rules && this.rules.map((entry, index) =>{
    //         if(entry.product_id_rule === item.product_id) found = index
    //     })

    //     if(found ===-1){
    //         return false;
    //     }


    // }
}

module.exports = ShoppingCart