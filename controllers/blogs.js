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

router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    await blog?.destroy()
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(400).send({ error })
  }
})

module.exports = router
