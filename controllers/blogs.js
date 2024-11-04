const { Op } = require('sequelize')
const { Blog, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const { search } = req.query
  const where = {}

  if (search) {
    where.title = { [Op.iLike]: `%${search}%` }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const { author, url, title, likes } = req.body
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ author, url, title, likes, userId: user.id })
  res.send(blog)
})

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)

  if (req.blog && user.id !== req.blog.userId) {
    return res.sendStatus(401)
  }

  await req.blog?.destroy()
  res.sendStatus(204)
})

router.put('/:id', blogFinder, async (req, res) => {
  const { likes } = req.body

  if (req.blog) {
    if (likes) req.blog.likes = likes
    await req.blog.save()
    res.status(200).json(req.blog)
  } else {
    return res.status(404).json({ error: 'Blog not found' })
  }
})

module.exports = router
