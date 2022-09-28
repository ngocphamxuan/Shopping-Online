const express = require('express');
require('dotenv/config')
const mongodbConnect = require('./config/db/mongodb');
const cartRouters = require('./routers/cart.routers');
const customerRouters = require('./routers/customer.routers');
const inventoryRouter = require('./routers/inventory.rounter');
const productRouters = require('./routers/product.routers');
const orderRouter = require('./routers/order.routers')
const app = express()

app.use(express.json());

app.use(productRouters)
app.use(customerRouters)
app.use(cartRouters)
app.use(inventoryRouter)
app.use(orderRouter)


const PORT  = process.env.PORT || 8081
app.listen(PORT, (err) => {
    if(err) console.log(err)
    else {
        console.log(`Server started at: http://localhost:${PORT}`)
        mongodbConnect()
    }
})