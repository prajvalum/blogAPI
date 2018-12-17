const response = require('./../libs/responseLib')

let errorHandler = (err, req, res, next) => {
    console.log("application error handler called");
    console.log(err);
    let routeNotFoundResponse = response.generate(true, "some error happened at global level", 500, null)
    res.send(routeNotFoundResponse);
}

let notFoundError = (req, res, next) => {
    console.log("Global not found handler called");
    let routeNotFoundResponse = response.generate(true, "Route not found in application", 404, null)
    res.send(routeNotFoundResponse);
}

module.exports = {
    globalErrorHandler: errorHandler,
    globalNotFoundError: notFoundError
}