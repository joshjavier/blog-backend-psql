const { DataTypes } = require("sequelize")

module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable('sessions', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogusers', key: 'id' },
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    })
  },
  async down({ context: queryInterface }) {
    await queryInterface.dropTable('sessions')
  },
}
