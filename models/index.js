// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

Product.hasOne(Category, {
  foreignKey: 'category_name'
});


// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'product_name'

});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(ProductTag, {
  foreignKey: 'tag_id'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(ProductTag, {
  foreignKey: 'product_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};