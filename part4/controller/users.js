const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt');
const { response } = require('express');

userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

userRouter.post('/', async (req, res) => {
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