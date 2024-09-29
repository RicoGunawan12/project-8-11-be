import Product from "../models/product.model.js";
import ProductCategory from "../models/productCategory.model.js";
import ProductVariant from "../models/productVariant.model.js";


ProductCategory.hasMany(Product, { foreignKey: 'categoryId'} )
Product.belongsTo(ProductCategory, { foreignKey: 'categoryId' } );

Product.hasMany(ProductVariant, { foreignKey: 'productId' } );
ProductVariant.belongsTo(Product, { foreignKey: 'productId' } );

export { Product, ProductVariant, ProductCategory };