const { DataTypes } = require("sequelize");

module.exports = {
  async up ({ context: queryInterface }) {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      validate: {
        isValidYear(value) {
          const currentYear = new Date().getFullYear()
          if (parseInt(value) < 1991 || parseInt(value) > currentYear) {
            throw new Error('Year must be at least 1991 up to the current year.')
          }
        }
      },
    })
  },

  async down ({ context: queryInterface }) {
    await queryInterface.removeColumn('blogs', 'year')
  }
};
