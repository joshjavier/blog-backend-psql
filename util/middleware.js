const errorHandler = (err, req, res, next) => {
  console.log(err)

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const errorObj = {}
    err.errors.forEach(e => {
      errorObj[e.path] = e.message
    });
    res.status(400).json(errorObj)
  } else {
    res.status(400).json({ error: err.message })
  }

  next(err)
}

module.exports = {
  errorHandler
}
