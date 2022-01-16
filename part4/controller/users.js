const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt');
const { response } = require('express');

userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

userRouter.post('/', async (req, res) => {
    if (req.body.username.length < 3) {
        return res.status(400).json({error: 'username must be atleast 3 characters long'})
    }
    if (req.body.password.length < 3) {
        return res.status(400).json({error: 'password must be atleast 3 characters long'})
    }
    const saltRound = 10
    const passwordHash = await bcrypt.hash(req.body.password, saltRound)

    const newUser = new User({
        username: req.body.username,
        passwordHash: passwordHash
    })

    const savedUser = await newUser.save()
    res.json(savedUser)
})

module.exports = userRouter