const GENDER = ['MALE', 'FEMALE', 'OTHER']

const CustomerStatus = {
    ACTIVE: 0,
    BLOCK: 1,
}

const DISCOUNT = {
    ID_DEFAULT: 'abcxyz',
    UNIT: {
        PERCENT: 0,
        DOLAR: 1,
    },
    STATUS: {
        ACTIVE: 0,
        INACTIVE: 1,
    }
}

const OrderStatus = {
    PENDING: 0, //waiting for confirm order,
    CONFIRMED: 1, //confirmed order
    DELIVERING: 2, //Delivering
    COMPLETED: 3, //Completed order,
    CUSTOMERCANCEL: -1,
    STAFFCANCEL: -2,

}
const PaymentType = {
    COD: 0, //Cash on delivery,
    
}

module.exports = {
    GENDER: GENDER,
    CustomerStatus: CustomerStatus,
    DISCOUNT: DISCOUNT,
    OrderStatus: OrderStatus,
}