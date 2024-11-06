const { User, Blog } = require('../models')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {
        exclude: ['userId'],
      },
    },
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: {
      exclude: ['id', 'createdAt', 'updatedAt'],
    },
    include: {
      model: Blog,
      as: 'readings',
      attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
      through: { attributes: ['read', 'id'] },
    },
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ error: 'User not found' })
  }
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
