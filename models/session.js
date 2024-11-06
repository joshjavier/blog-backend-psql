const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

const Session = sequelize.define('session', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogusers', key: 'id' },
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  timestamps: false,
})

module.exports = Session
