const { DataTypes } = require("sequelize");

module.exports = {
  async up ({ context: queryInterface }) {
    await queryInterface.createTable('blogusers', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    })
    await queryInterface.createTable('blogs', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
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
      user_id: {
        type: DataTypes.INTEGER,
        references: { model: 'blogusers', key: 'id' },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {

    })
  },

  async down ({ context: queryInterface }) {
    await queryInterface.dropTable('blogusers')
    await queryInterface.dropTable('blogs')
  }
};
