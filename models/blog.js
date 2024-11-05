const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

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
  year: {
    type: DataTypes.INTEGER,
    validate: {
      isValidYear(value) {
        const currentYear = new Date().getFullYear()
        if (parseInt(value) < 1991 || parseInt(value) > currentYear) {
          throw new Error('Year must be at least 1991 up to the current year.')
        }
      }
    },
  }
}, {
  underscored: true,
})

module.exports = Blog
