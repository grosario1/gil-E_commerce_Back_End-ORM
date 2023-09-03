//this line will import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
//this line will import our database connection from config.js
const sequelize = require('../config/connection');
//this line will import the category model
const Category = require('./Category');
//this line will import the Tag model
const Tag = require('./Tag')
//this line will import the ProductTag model
const ProductTag = require('./ProductTag')

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // Define the columns 
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Category, 
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

// Product.belongsTo(Category, {
//   foreignKey: 'category_id',
// });

// Product.belongsToMany(Tag, {
//   through: ProductTag,
//   foreignKey: 'product_id',
// });

module.exports = Product;