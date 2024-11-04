const { User } = require('../models')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

router.post('/', async (req, res) => {
  const { name, username } = req.body
  const user = await User.create({ name, username })
  res.json(user)
})

router.put('/:username', async (req, res) => {
  const { username } = req.params
  const user = await User.findOne({ where: { username } })
  if (user) {
    user.username = req.body.username
    await user.save()
    res.json(user)
  } else {
    res.status(404).json({ error: 'User not found' })
  }
})

module.exports = router
