class CustomError extends Error {
    constructor(httpStatus, apiStatus, message) {
        super(message)
        this.httpStatus = httpStatus
        this.apiStatus = apiStatus
    }
}

module.exports = CustomError