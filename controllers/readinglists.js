const { ReadingList } = require('../models')

const router = require('express').Router()

router.post('/', async (req, res) => {
  const { blogId, userId } = req.body
  const readinglist = await ReadingList.create({ blogId, userId })
  res.json(readinglist)
})

module.exports = router
