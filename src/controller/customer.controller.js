// // const Customer = require("../model/customer")
// const CartService = require("../service/cart.service")
// const CustomerService = require("../service/customer.service")
// const {hash, compare} = require('bcrypt')
// const jwt = require('jsonwebtoken')

// const CustomerController = {

//     //guest
//     register: async(req, res, next) => {
//         try {

//             const newCustomer = new Customer({
//                 email: req.body.email,
//                 fullname: req.body.fullname,
//                 phone: req.body.phone,
//                 gender: req.body.gender,
//                 avatarUrl: req.body.avatarUrl,
//                 password: hash(req.body.password),
//             })
//             const data = await CustomerService.saveCustomer(newCustomer)
//             return res.status(200).json({data})
//         } catch (error) {
//             return error
//         }
//     },
//     login: async (req, res, next) => {
//         //login by phone
//         const customer = await CustomerService.getCustomerByPhone(req.body.phone)
//         if(!compare(customer.password, req.body.password)) throw new Error('Incorrect Password')
//         const cusInfo = {
//             id: customer.id,
//             phone: customer.phone,
//             email: customer.email,
//             fullname: customer.fullname,
//         }
//         const token = jwt.sign(cusInfo, process.env.ACCESS_TOKEN_SECRET, {
//             expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
//         })
//         const refreshToken = jwt.sign(cusInfo, process.env.REFRESH_TOKEN_SECRET, {
//             expiresIn: process.env.REFRESH_TOKEN_EXPIRATION
//         })
//         res.status(400).json({
//             accessToken: token,
//             tokenExpire: parseInt(process.env.ACCESS_TOKEN_EXPIRATION),
//             refreshToken: refreshToken,
//             refreshTokenExpire: parseInt(process.env.REFRESH_TOKEN_EXPIRATION),
//         })
//     },
//     changePassword: async (req,res) => {
//         try {
//             const oldPassword = req.body.oldPassword
//             const customer = CustomerService.getCustomerByID(req.userId)
//             if(!compare(customer.password, oldPassword)) res.send(200).json({
//                 message: 'Incorrect old password',
//             })
//             const newPassword = req.body.newPassword
//             if(!validator(newPassword)) throw new Error('New password is invalid')
//             await CustomerService.update({
//                 password: hash(newPassword)
//             })
//         } catch (error) {
//             res.send(400).json({
//                 message: error.message,
//             })
//         }
//     },

//     //user
//     forgotPassword: async (req, res) => {
        
//     },
//     cancelOrder: {},
//     updateProfile: {},

//     //admin
//     getAllCustomer: {},
//     getCustomerByID: {},
//     getHistoryOrderCustomer: {},

// }

// module.exports = {
//     CustomerController: {}
// }