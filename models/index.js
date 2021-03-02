const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '/../config/config.json'))[env]
const db = {}

const sequelize = new Sequelize(process.env[config.use_env_variable])

// fs.readdirSync(__dirname)
//   .filter(
//     file =>
//       file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
//   )
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     )
//     db[model.name] = model
//   })



  //  https://shareablecode.com/snippets/solution-for-typeerror-require-is-not-a-function-while-using-sequelize-with-expr-vWFm-f34v
  fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    if (typeof(model) != "function") return;
    db[model.name] = model;
  });












Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
