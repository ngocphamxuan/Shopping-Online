const _customer = require("../model/customer.model");

const CustomerService = {
  createCustomer: async (customer) => {
    try {
      const newCustomer = await _customer.create(customer);
      return {
        email: newCustomer.email,
        fullname: newCustomer.fullname,
        gender: newCustomer.gender,
        phone: newCustomer.phone,
        avatarUrl: newCustomer.avatarUrl
      }
    } catch (error) {
      console.log(error)
      return error;
    }
  },
  getCustomerByPhone: async (phone) => {
    return await _customer.findOne({
      phone: phone
    })
  },
  getAllCustomer: async () => {
    return await _customer.find()
  }
};

module.exports = CustomerService;
