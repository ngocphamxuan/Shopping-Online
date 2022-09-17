const Cart = require('../model//cart')
const CartItems = require('../model/cartItem')

const CartService = {
    saveCart: async (cart) => {
        try {
            await cart.save()
        } catch (error) {
            return error
        }
    },
    getCartByID: async (id) => {
        try {
            const cart = await Cart.findById(id)
            const listCartItems = await CartItems.find({
                cartId: cart.id,
            })
            
            cart.listCartItems = listCartItems
            console.log(cart)
            return {
                ...cart._doc,
                listCartItems
            }
        } catch (error) {
            return error
        }
    }
}

module.exports = CartService