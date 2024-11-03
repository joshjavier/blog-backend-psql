const { Blog } = require('../models')

const router = require('express').Router()

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll()
    res.json(blogs)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error })
  }
})

router.post('/', async (req, res) => {
  const { author, url, title, likes } = req.body
  try {
    const blog = await Blog.create({ author, url, title, likes })
    res.send(blog)
  } catch (error) {
    console.log(error)
    res.status(400).send({ error })
  }
})

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.delete('/:id', blogFinder, async (req, res) => {
  try {
    await req.blog?.destroy()
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error })
  }
})

router.put('/:id', blogFinder, async (req, res) => {
  const { likes } = req.body
  try {
    if (req.blog) {
      if (likes) req.blog.likes = likes
      await req.blog.save()
      res.status(200).json(req.blog)
    } else {
      return res.status(404).json({ error: 'Blog not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(400).send({ error })
  }
})

module.exports = router
