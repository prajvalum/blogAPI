let errorHandler = (err, req, res, next) => {
    console.log("application error handler called");
    console.log(err);
    res.send("some error happened at global level");
}

let notFoundError = (req, res, next) => {
    console.log("Global not found handler called");
    res.send(404).send("Route not found in application");
}

module.exports = {
    globalErrorHandler: errorHandler,
    globalNotFoundError: notFoundError
}