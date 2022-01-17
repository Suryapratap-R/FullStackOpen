const logger = require('./logger');
const User = require('../models/user')
const jsonwebtoken = require('jsonwebtoken');

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
    } else {
        request.token = null
    }
    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jsonwebtoken.verify(request.token, process.env.JWT_SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({'error': 'token invalid or missing'})
    }

    const user = await User.findById(decodedToken.id)
    request.user = user
    next()
}

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}