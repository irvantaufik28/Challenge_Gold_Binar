"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user")(sequelize, Sequelize);
db.category = require("./category")(sequelize, Sequelize);
db.product = require("./product")(sequelize, Sequelize);
db.order = require("./order")(sequelize, Sequelize);
db.orderDetail = require("./orderdetail")(sequelize, Sequelize);

db.user.hasMany(db.order, { foreignKey: "user_id" });
db.order.belongsTo(db.user, { foreignKey: "user_id" });

db.category.hasMany(db.product, { foreignKey: "category_id" });
db.product.belongsTo(db.category, { foreignKey: "category_id" });

db.order.hasMany(db.orderDetail, { foreignKey: "order_id" });
db.orderDetail.belongsTo(db.orderDetail, { foreignKey: "order_id" });

db.orderDetail.belongsTo(db.product, { foreignKey: "product_id" });
db.product.hasMany(db.orderDetail, { foreignKey: "product_id" });

module.exports = db;
