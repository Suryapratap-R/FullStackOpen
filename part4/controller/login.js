const bcrypt = require('bcrypt');
const User = require('../models/user');
const jsonwebtoken = require('jsonwebtoken');
const loginRouter = require('express').Router();

loginRouter.post('/',async (request, response) => {
    const body = request.body
    const user = await User.findOne({username: body.username})
    const isValidPassword = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && isValidPassword)) {
        return response.status(401).json({'error': 'invalid username or password'})
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }
    const token = await jsonwebtoken.sign(userForToken, process.env.JWT_SECRET)

    response.status(200).json({token, username: user.username, name: user.name})
})

module.exports = loginRouter