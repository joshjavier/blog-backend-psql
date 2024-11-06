const jwt = require("jsonwebtoken")
const { SECRET } = require("./config")
const { Session } = require("../models")

const errorHandler = (err, req, res, next) => {
  console.log(err)

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    // const errorObj = {}
    // err.errors.forEach(e => {
    //   errorObj[e.path] = e.message
    // });
    res.status(400).json({ error: err.errors.map(e => e.message) })
  } else {
    res.status(400).json({ error: err.message })
  }

  next(err)
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const activeSession = await Session.findOne({ where: { token: authorization.slice(7) } })
      if (!activeSession)
        return res.status(401).json({ error: 'Token expired' })

      req.decodedToken = jwt.verify(authorization.slice(7), SECRET)
    } catch (error) {
      return res.status(401).json({ error: 'Token invalid' })
    }

  } else {
    return res.status(401).json({ error: 'Token missing' })
  }
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
}
