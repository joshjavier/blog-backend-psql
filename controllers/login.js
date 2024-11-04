const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { SECRET } = require('../util/config')

const router = require('express').Router()

router.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ where: { username } })
  const passwordIsCorrect = password === 'secret'

  if (!(user && passwordIsCorrect)) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  res.json({
    token,
    username: user.username,
    name: user.name,
  })
})

module.exports = router
