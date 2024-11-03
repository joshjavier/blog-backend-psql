const { Blog } = require('../models')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const { author, url, title, likes } = req.body
  const blog = await Blog.create({ author, url, title, likes })
  res.send(blog)
})

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.delete('/:id', blogFinder, async (req, res) => {
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
