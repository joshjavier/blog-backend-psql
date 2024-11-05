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
}, {
  underscored: true,
})

module.exports = Blog
