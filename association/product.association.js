import Product from "../models/product.model.js";
import ProductCategory from "../models/productCategory.model.js";
import ProductVariant from "../models/productVariant.model.js";
import Rating from "../models/rating.model.js";
import { User } from "./cart.association.js";


ProductCategory.hasMany(Product, { foreignKey: 'ref_product_category_id'} )
Product.belongsTo(ProductCategory, { foreignKey: 'ref_product_category_id' } );

Product.hasMany(ProductVariant, { foreignKey: 'ref_product_id', onDelete: 'CASCADE' } );
ProductVariant.belongsTo(Product, { foreignKey: 'ref_product_id' } );

// Product.hasMany(Rating, { foreignKey: 'product_id', onDelete: 'CASCADE' })
// Rating.belongsTo(Product, { foreignKey: 'product_id' })

// User.hasMany(Rating, { foreignKey: 'user_id', onDelete: 'CASCADE' })
// Rating.belongsTo(User, { foreignKey: 'user_id' })

export { Product, ProductVariant, ProductCategory, Rating, User };