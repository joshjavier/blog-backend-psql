const { ReadingList } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const router = require('express').Router()

router.post('/', async (req, res) => {
  const { blogId, userId } = req.body
  const readinglist = await ReadingList.create({ blogId, userId })
  res.json(readinglist)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const readinglist = await ReadingList.findByPk(req.params.id)

  if (!readinglist)
    return res.sendStatus(404)

  if (req.decodedToken.id === readinglist.userId) {
    readinglist.read = req.body.read
    await readinglist.save()
    res.json(readinglist)
  } else {
    res.status(401).json({ error: 'You can only change your own reading list.' })
  }
})

module.exports = router
