const logger = require('./logger');

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)
    if (error.name === 'ValidationError') {
        res.status(400).json({error: 'malformatted request'})
    }
    next(error)
}

const tokenExtractor = (request, response, next) => {
    const auth = request.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        request.token = auth.substring(7)
        return next()
    }
    request.token = null
    return next()
}

module.exports = {
    errorHandler,
    tokenExtractor
}