const CartItems = require("../model/cartItem");
const CartService = require("../service/cart.service");

const OrdersController = {
    //admin
    confirmOrder: {},
    cancelOrder: {},
    updateStatusOrder: {},
    getOrderByID: async (req, res) => {

    },
    getAllOrders: {},
    getOrdersByCustomerID: async (req, res) => {
        //if customer query our orders using userId, 
        //admin query orders by customerID
        const customerID = req.userId || req.params.customerID
        const orders = OrdersService.getOrdersByCustomerID(customerID)
        res.status(200).json(orders)
    },
    filterOrders: async (req, res) => {
        //customer can filter by date, 
    },
    createOrders: async (req, res) => {
        //make orders all items in cart?

        //listCartItems
        const listCartItems = req.body.listCartItems;
        //convert cartItems to orderItems
        const listPromise = listCartItems.map((item) => {
            return item.save()
        })
        await Promise.all(listPromise)
        //create order
        const newOrder = {
            customerID: req.body.customerID,
            total: req.body.total,
            listOrderItems: req.body.listOrderItems,
        }

        const newOrderPromist =  OrdersService.save(newOrder)
        //delete items in cart
        const cartDeletePromist = CartService.delete(listCartItems)
        await newOrderPromist
        await cartDeletePromist
    },
    getOrderByID: async() => {

    },
    getAllOrderByStatus: async() => {
        const startDate = req.query['startDate']
        const endDate = req.query['endDate']
        
    },
}