
const resp = function (res, httpStatus, apiStatus, message, data) {
    return res.status(httpStatus).json({
        apiStatus: apiStatus,
        message: message,
        data: data
    })
}

module.exports = {
    _resp: resp
}