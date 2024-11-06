const { Session } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const router = require('express').Router()

router.delete('/', tokenExtractor, async (req, res) => {
  const authorization = req.get('authorization')
  const session = await Session.findOne({ where: { token: authorization.slice(7) } })

  if (session) {
    await session.destroy()
  }

  res.sendStatus(204)
})

module.exports = router
