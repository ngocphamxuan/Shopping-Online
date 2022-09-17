const express = require('express');
require('dotenv/config')
const mongodbConnect = require('./config/db/mongodb');
const cartRouters = require('./routers/cart.routers');
const cartItemRouters = require('./routers/cartitems.routers');
const customerRouters = require('./routers/customer.routers');

const productRouters = require('./routers/product.routers');
const app = express()

app.use(express.json());

app.use(productRouters)
app.use(customerRouters)
app.use(cartItemRouters)
app.use(cartRouters)

const PORT  = process.env.PORT || 8081
app.listen(PORT, (err) => {
    if(err) console.log(err)
    else {
        console.log(`Server started at: http://localhost:${PORT}`)
        mongodbConnect()
    }
})