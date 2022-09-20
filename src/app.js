// const express = require('express');
// require('dotenv/config')
// const mongodbConnect = require('./config/db/mongodb');
// const cartRouters = require('./routers/cart.routers');
// const cartItemRouters = require('./routers/cartitems.routers');
// const customerRouters = require('./routers/customer.routers');

// const productRouters = require('./routers/product.routers');
// const app = express()

// app.use(express.json());

// app.use(productRouters)
// app.use(customerRouters)
// app.use(cartItemRouters)
// app.use(cartRouters)

// const PORT  = process.env.PORT || 8081
// app.listen(PORT, (err) => {
//     if(err) console.log(err)
//     else {
//         console.log(`Server started at: http://localhost:${PORT}`)
//         mongodbConnect()
//     }
// })
// setTimeout

const test = async (a, b, c) =>{  
    const books = await setTimeout(()=> {
      console.log('20s')
      return a+b
  }, 4000) //get object Boonk;
  const author = await setTimeout(()=>{
      console.log('30s')
  }, 8000); // get author via authorId
 console.log('abc')
 return {
    books,
    author,
 }
}

 test(2,5, 7).then((data) => {
    console.log(data)
 })