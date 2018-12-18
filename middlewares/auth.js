const logger = require('./../libs/loggerLib')
const response = require('./../libs/responseLib')
const check = require('./../libs/checkLib')

let isAuthenticated = (req, res, next) => {
    if (req.params.authToken || req.query.authToken || req.header('authToken')) {
        if (req.params.authToken == 'Admin' || req.query.authToken == 'Admin' || req.header('authToken') == 'Admin') {
            req.user = {fullName:'Admin', userId:'Admin'}
            next()
        }
        else {
            logger.error('Incorrect Authentication Error', 'Authentication Middleware', 5)
            let apiResponse = response.generate(true, 'Incorrect Authentication Error', 403)
            res.send(apiResponse)
        }
    }
    else {
        logger.error('Authentication Token Missing', 'Authentication Middleware', 5)
        let apiResponse = response.generate(true, 'Authentication Token Missing In Request', 403)
        res.send(apiResponse)
    }
}

module.exports = {
    isAuthenticated:isAuthenticated
}