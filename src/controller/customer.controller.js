const Customer = require("../model/customer")
const CartService = require("../service/cart.service")
const CustomerService = require("../service/customer.service")

const CustomerController = {

    //guest
    register: async(req, res, next) => {
        try {

            const newCustomer = new Customer({
                ...req.body
            })
            const data = await CustomerService.saveCustomer(newCustomer)
            return res.status(200).json({data})
        } catch (error) {
            return error
        }
    },
    login: {},
    forgotPassword: {},

    //user
    changePassword: {},
    cancelOrder: {},
    updateProfile: {},

    //admin
    getAllCustomer: {},
    getCustomerByID: {},
    getHistoryOrderCustomer: {},

}

module.exports = CustomerController