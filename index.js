require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize')
const express = require('express')

const sequelize = new Sequelize(process.env.DATABASE_URL)
const app = express()
app.use(express.json())

const Blog = sequelize.define('blog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  author: DataTypes.STRING,
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: false,
  underscored: true,
})

app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.findAll()
    res.json(blogs)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error })
  }
})

app.post('/api/blogs', async (req, res) => {
  const { author, url, title, likes } = req.body
  try {
    const blog = await Blog.create({ author, url, title, likes })
    res.send(blog)
  } catch (error) {
    console.log(error)
    res.status(400).send({ error })
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    await blog?.destroy()
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(400).send({ error })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
