const checkParamRequest =  (params) => {
  return async (req, res, next) => {
    let missingParams = params.filter((item) => {
      return !eval(`req.body.${item}`);
    });
    console.log(missingParams)
    if (missingParams.length === 0) next();
    else
      next(
        JSON.stringify({
          error: "query error",
          message: "Parameter(s) missing: " + missingParams.join(","),
        })
      );
  };
};

module.exports = checkParamRequest