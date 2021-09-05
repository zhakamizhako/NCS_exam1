var express = require('express')

  app = express(),
  port = process.env.PORT || 3000;

  app.use(express.json())
  var routes = require('./api/routes.js')
  routes(app)

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);