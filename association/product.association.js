import Product from "../models/product.model.js";
import ProductCategory from "../models/productCategory.model.js";
import ProductVariant from "../models/productVariant.model.js";


ProductCategory.hasMany(Product, { foreignKey: 'category_id'} )
Product.belongsTo(ProductCategory, { foreignKey: 'category_id' } );

Product.hasMany(ProductVariant, { foreignKey: 'product_id' } );
ProductVariant.belongsTo(Product, { foreignKey: 'product_id' } );

export { Product, ProductVariant, ProductCategory };