'use strict';
module.exports = function(app) {
  var purchaseController = require('./controllers/purchaseController');

  // purchase control
app.route('/cart')
    .post(purchaseController.addToCart);

//Invalid urls
app.get('*', (req, res)=>{
    res.status(404).send({url: req.originalUrl + ' not found'})
})
app.post('*', (req, res)=>{
    res.status(404).send({message: req.originalUrl + ' not found'})
})
app.put('*', (req, res)=>{
    res.status(404).send({message: req.originalUrl + ' not found'})
})
app.delete('*', (req, res)=>{
    res.status(404).send({message: req.originalUrl + ' not found'})
})

};
