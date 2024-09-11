const expressAsyncHandler = require('express-async-handler');
const { registerValidation, loginValidation } = require('../validations/auth')
const User = require("../models/User")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


// @desc register user
// @route POST /api/users/register
// @access public
const register = expressAsyncHandler(async (req, res) => {
  const { error, value } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  const { email } = value
  const isEmailExist = await User.findOne({ email })
  if (isEmailExist) return res.status(400).send('User already exist');


  // hash password
  const salt = await bcrypt.genSalt(15)
  const hashedPassword = await bcrypt.hash(value.password, salt)

  // created user
  const user = new User({
    ...value, password: hashedPassword
  })

  const savedUser = await user.save()
  res.send(savedUser)

})


// @desc login user
// @route POST /api/users/login
// @access public
const login = expressAsyncHandler(async (req, res) => {
  const { error, value } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  const { email } = value
  const user = await User.findOne({ email })
  if (!user) return res.status(400).send('User does not exist');

  const validPassword = await bcrypt.compare(value.password, user.password)
  if (!validPassword) return res.status(400).send('Email or password not correct');

  const token = await jwt.sign({ _id: user._id, }, process.env.TOKEN_SECRET, { expiresIn: '1h' })
  res.header('auth-token', token)
  res.send({ token })
})

// @desc current user
// @route GET /api/users/current
// @access private 
const getCurrentUser = expressAsyncHandler(async (req, res) => {
  res.status(200).json('current')
})


module.exports = { login, register, getCurrentUser }