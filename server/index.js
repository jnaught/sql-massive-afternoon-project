const express=require('express');//Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. more info here "https://expressjs.com/"
app=express(),
{ json }=require('body-parser'),//Node.js body parsing middleware. Parse incoming request bodies in a middleware before your handlers, available under the req.body property. more info here "https://github.com/expressjs/body-parser"
cors=require('cors'),//cors. CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. more info here "https://github.com/expressjs/cors"
port=3000, // declaring port to run on server.
massive=require('massive');//Massive.js is a data mapper for Node.js more infor here "https://github.com/dmfay/massive-js"
require('dotenv').config()
const products_controller = require('./products_controller');


app.use(json());
app.use(cors());
// invoke massive to return 'promise' with CONNECTION_STRING from .env file
massive(process.env.CONNECTION_STRING)
.then(db =>
    app.set('db', db)
)
.catch(console.log);

// Create end points
// create new in database.
app.post('/api/product', products_controller.create); //maps to products_controller.js on root folder calling on 'create:'
//get all info from database.
app.get('/api/products', products_controller.getAll); // maps to products_controller.js on root folder calling on  'getAll:'
//get single query from database.
app.get('/api/product/:id', products_controller.getOne); // maps to products_controller.js on root folder calling on'getOne:'
// update existing data on the database.
app.put('/api/product/:id', products_controller.update); // maps to products_controller.js on root folder calling on 'update:'
// delete a item from database.
app.delete('/api/product/:id', products_controller.delete); // maps to products_controller.js on root folder calling on 'delete:'


app.listen(port, console.log(`Listening on ${port}`)); // server listens on designated port and console logs the port that it listens on.