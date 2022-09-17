const ApiStatus = require("../constant/ApiStatus");
const HttpStatus = require("../constant/HttpStatus");
const CustomError = require("../error/CustomError");
const Product = require("../model/product");
const {resp} = require("../payload/response");
const ProductService = require("../service/product.service");
const MessageResponse = require("../constant/MessageResponse")

const ProductController = {
  getProductByDicount: {},
  getTopProductRating: {},
  createProduct: async (req, res, next) => {
    try {
      const productRequest = new Product({
       ...req.body
      });
      const data = await ProductService.saveProduct(productRequest)
      return resp(res, HttpStatus.ACCEPTED, ApiStatus.SUCCESS, MessageResponse.SUCCESS, data)
    } catch (error) {
      if(error instanceof CustomError) 
        return resp(res, error.httpStatus, error.apiStatus, error.message, {})
      return resp(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiStatus.OTHER_ERR, MessageResponse.OTHER_ERR, {})
    }
  },
  updateProduct: async (req, res, next) => {
    try {
        const id = req.params.id
        let productRequest = await ProductService.getProductByID(id)
        const data = await ProductService.updateProduct(product)
        return resp(res, HttpStatus.ACCEPTED, ApiStatus.SUCCESS, MessageResponse.SUCCESS, data)
    } catch (error) {
        if(error instanceof CustomError) 
        return resp(res, error.httpStatus, error.apiStatus, error.message, {})
      return resp(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiStatus.OTHER_ERR, MessageResponse.OTHER_ERR, {})
    }
  },
  //page, limit
  getAllProduct: async (req, res, next) => {
    try {
        const page = req.query['page'] > 0 ? req.query['page'] : 1
        const limit = req.query['limit'] > 0 ? req.query['limit'] : 10
        const data = await ProductService.getAllProduct(page, limit)
        return resp(res, HttpStatus.ACCEPTED, ApiStatus.SUCCESS, MessageResponse.SUCCESS, data)
        
    } catch (error) {
        if(error instanceof CustomError) 
        return resp(res, error.httpStatus, error.apiStatus, error.message, {})
      return resp(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiStatus.OTHER_ERR, MessageResponse.OTHER_ERR, {})
    }
  },
  getProductByID: async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await ProductService.getProductByID(id)
        return resp(res, HttpStatus.ACCEPTED, ApiStatus.SUCCESS, MessageResponse.SUCCESS, data)
    } catch (error) {
        if(error instanceof CustomError) 
        return resp(res, error.httpStatus, error.apiStatus, error.message, {})
      return resp(res, HttpStatus.INTERNAL_SERVER_ERROR, ApiStatus.OTHER_ERR, MessageResponse.OTHER_ERR, {})
    }
  },
  filterProduct: {},
  deleteProduct: {},
};

module.exports = ProductController;
