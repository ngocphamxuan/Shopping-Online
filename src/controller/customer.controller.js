const CustomerService = require("../service/customer.service");
const { hash, compare } = require("bcrypt");
const _customer = require("../model/customer.model");
const jwt = require("jsonwebtoken");
const { _resp } = require("../payload/response");
const HttpStatus = require("../constant/HttpStatus");
const ApiStatus = require("../constant/ApiStatus");
const MessageResponse = require("../constant/MessageResponse");

const CustomerController = {
  //guest
  register: async (req, res, next) => {
    try {
      const hashPassword = await hash(req.body.password, 10);
      const newCustomer = new _customer({
        email: req.body.email,
        fullname: req.body.fullname,
        phone: req.body.phone,
        gender: req.body.gender,
        avatarUrl: req.body.avatarUrl,
        password: hashPassword,
      });
      console.log(newCustomer);
      const data = await CustomerService.createCustomer(newCustomer);
      _resp(
        res,
        HttpStatus.ACCEPTED,
        ApiStatus.SUCCESS,
        MessageResponse.SUCCESS,
        data
      );
    } catch (error) {
      _resp(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        ApiStatus.OTHER_ERR,
        error.message,
        {}
      );
    }
  },
  login: async (req, res, next) => {
    try {
      //login by phone
      const customer = await CustomerService.getCustomerByPhone(req.body.phone);
      if (!customer)
        throw new Error(
          `Not found customer with phone number: ${req.body.phone}`
        );
      const verifyPass = await compare(req.body.password, customer.password);
      if (!verifyPass) throw new Error("Incorrect Password");
      const cusInfo = {
        id: customer.id,
        phone: customer.phone,
        email: customer.email,
        fullname: customer.fullname,
      };
      const token = jwt.sign(cusInfo, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
      });
      const refreshToken = jwt.sign(cusInfo, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
      });
      const data = {
        accessToken: token,
        tokenExpire: parseInt(process.env.ACCESS_TOKEN_EXPIRATION),
        refreshToken: refreshToken,
        refreshTokenExpire: parseInt(process.env.REFRESH_TOKEN_EXPIRATION),
      };
      _resp(
        res,
        HttpStatus.ACCEPTED,
        ApiStatus.SUCCESS,
        MessageResponse.SUCCESS,
        data
      );
    } catch (error) {
      _resp(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        ApiStatus.OTHER_ERR,
        error.message,
        {}
      );
    }
  },
  changePassword: async (req, res) => {
    try {
      const oldPassword = req.body.oldPassword;
      const customer = CustomerService.getCustomerByID(req.userId);
      if (!compare(customer.password, oldPassword))
        res.send(200).json({
          message: "Incorrect old password",
        });
      const newPassword = req.body.newPassword;
      if (!validator(newPassword)) throw new Error("New password is invalid");
      await CustomerService.update({
        password: hash(newPassword),
      });
    } catch (error) {
      res.send(400).json({
        message: error.message,
      });
    }
  },

  //user
  forgotPassword: async (req, res) => {},
  cancelOrder: {},
  updateProfile: {},

  //admin
  getAllCustomer: async (req, res, next) => {
    try {
      const data = await CustomerService.getAllCustomer();
      _resp(
        res,
        HttpStatus.ACCEPTED,
        ApiStatus.SUCCESS,
        MessageResponse.SUCCESS,
        data
      );
    } catch (error) {
      _resp(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        ApiStatus.OTHER_ERR,
        error.message,
        {}
      );
    }
  },
  getCustomerByID: {},
  getHistoryOrderCustomer: {},
};

module.exports = CustomerController;
