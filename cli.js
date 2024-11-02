require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

const main = async () => {
  try {
    const results = await sequelize.query('SELECT * FROM blogs;', { type: QueryTypes.SELECT })

    results.forEach(r => {
      console.log(`${r.author}: '${r.title}', ${r.likes} likes`)
    });

    sequelize.close()
  } catch (error) {
    console.log('Unable to connect to the database:', error)
  }
}

main()
