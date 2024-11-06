const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

const ReadingList = sequelize.define('readinglist', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogusers', key: 'id' },
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogs', key: 'id' },
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
}, {
  underscored: true,
})

module.exports = ReadingList
