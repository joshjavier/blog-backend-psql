const Blog = require("./blog");
const ReadingList = require("./readinglist");
const Session = require("./session");
const User = require("./user");

User.hasMany(Blog)
Blog.belongsTo(User)
Blog.belongsToMany(User, { through: ReadingList, as: 'users_reading' })
User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
User.hasMany(Session)
Session.belongsTo(User)
// Blog.sync({ alter: true })
// User.sync({ alter: true })

module.exports = {
  Blog,
  User,
  ReadingList,
  Session,
}
