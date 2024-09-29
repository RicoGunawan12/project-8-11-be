import Product from "../models/product.model.js";
import ProductCategory from "../models/productCategory.model.js";
import ProductVariant from "../models/productVariant.model.js";
import Promo from "../models/promo.model.js";


ProductCategory.hasMany(Product, { foreignKey: 'categoryId'} )
Product.belongsTo(ProductCategory, { foreignKey: 'categoryId' } );

Product.hasMany(ProductVariant, { foreignKey: 'productId' } );
ProductVariant.belongsTo(Product, { foreignKey: 'productId' } );

ProductVariant.belongsTo(Promo, { foreignKey: 'productVariantId' });
Promo.belongsTo(ProductVariant, { foreignKey: 'productVariantId' });

export { Product, ProductVariant, ProductCategory, Promo };