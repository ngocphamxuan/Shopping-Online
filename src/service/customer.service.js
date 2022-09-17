const Cart = require('../model/cart')

const CustomerService = {
    saveCustomer: async (customer) => {
        try {
            // return customer.save((err, data) => {
            //     if(err) throw new Error()
            //     //if not error, create cart assign to customer
            //     const cart = new Cart({
            //         customerId: data.id,
            //         total: 0,
            //     })
            //    cart.save().then(data=> console.log(data)).catch(err => console.log(err))
            //    return data
            // })
            return customer.save().then(data => {
                const cart = new Cart({
                    customerId: data.id,
                    total: 0,
                })
                cart.save().catch(err => {
                    throw err
                })
                return data
            }).catch(err => {
                throw err
            })
        } catch (error) {
            return error
        }
    }
}

module.exports = CustomerService