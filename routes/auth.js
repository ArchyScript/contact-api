const router = require('express').Router()
const verifyToken = require('../middleware/verifyToken')
const { login, register, getCurrentUser } = require('../controller/userController')

router.post('/register', register)
router.post('/login', login)
router.get('/current', getCurrentUser)

module.exports = router