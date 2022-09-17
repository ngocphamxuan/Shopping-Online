const ApiStatus = require("../constant/ApiStatus");
const HttpStatus = require("../constant/HttpStatus");
const ProductController = require("../controller/product.controller");
const CustomError = require("../error/CustomError");
const Product = require("../model/product");
require("../error/CustomError");

const ProductService = {
  saveProduct: async (newProduct) => {
    try {
       return await newProduct.save();
    } catch (error) {
      throw new CustomError(HttpStatus.BAD_REQUEST, ApiStatus.INVALID_PARAM, error.message);
    }
  },
  getAllProduct: async (page, limit) => {
    try {
        return await Product.find({}).limit(limit*1).skip((page-1)*limit).exec();
    } catch (error) {
        throw new CustomError(HttpStatus.BAD_REQUEST, ApiStatus.INVALID_PARAM, error.message);
    }
  },
  getProductByID: async (id) => {
    try{
        return await Product.findById(id).catch(error => {
            throw new CustomError(HttpStatus.BAD_REQUEST, ApiStatus.INVALID_PARAM, `Cant found product with id: ${id}`);
        })
    } catch(error){
        throw new CustomError(HttpStatus.BAD_REQUEST, ApiStatus.INVALID_PARAM, error.message);
    }
  },
  updateProduct: async (id) => {
    try {
        return await Product.findByIdAndUpdate(id).catch(error => {
            throw new CustomError(HttpStatus.BAD_REQUEST, ApiStatus.INVALID_PARAM, `Cant found product with id: ${id}`);
        })
    } catch (error) {
        throw new CustomError(HttpStatus.BAD_REQUEST, ApiStatus.INVALID_PARAM, error.message);
    }
  },
  getQuantityAvalibleByID: async (id) => {
    try {
      return
    } catch (error) {
      
    }
  },
};

module.exports = ProductService;
