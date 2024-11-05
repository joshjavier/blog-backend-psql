const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL)

const migrator = new Umzug({
  logger: console,
  migrations: { glob: 'migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize })
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

const runMigrations = async () => {
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map(m => m.name)
  })
}

const rollbackMigrations = async () => {
  await sequelize.authenticate()
  await migrator.down()
}

module.exports = { connectToDatabase, sequelize, rollbackMigrations }
