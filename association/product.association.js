import Product from "../models/product.model.js";
import ProductCategory from "../models/productCategory.model.js";
import ProductVariant from "../models/productVariant.model.js";


ProductCategory.hasMany(Product, { foreignKey: 'ref_product_category_id'} )
Product.belongsTo(ProductCategory, { foreignKey: 'ref_product_category_id' } );

Product.hasMany(ProductVariant, { foreignKey: 'ref_product_id', onDelete: 'CASCADE' } );
ProductVariant.belongsTo(Product, { foreignKey: 'ref_product_id' } );

export { Product, ProductVariant, ProductCategory };