import PaymentMethod from "../models/paymentMethod.model.js";
import TransactionDetail from "../models/transactionDetail.model.js";
import TransactionHeader from "../models/transactionHeader.model.js";
import UserAddress from "../models/userAddress.model.js";
import Voucher from "../models/voucher.model.js";
import Wishlist from "../models/wishlist.model.js";
import WishlistItem from "../models/wishlistItem.model.js";
import { ProductVariant } from "./cart.association.js";
import { User } from "./product.association.js";


// PaymentMethod.hasMany(TransactionHeader, { foreignKey: 'ref_payment_method_id' });
// TransactionHeader.belongsTo(PaymentMethod, { foreignKey: 'ref_payment_method_id' });

TransactionHeader.hasMany(TransactionDetail, { foreignKey: 'ref_transaction_id', onDelete: 'CASCADE' });
TransactionDetail.belongsTo(TransactionHeader, { foreignKey: 'ref_transaction_id' });

User.hasMany(TransactionHeader, { foreignKey: 'ref_user_id' });
TransactionHeader.belongsTo(User, { foreignKey: 'ref_user_id' });

User.hasMany(UserAddress, { foreignKey: "ref_user_id" });
UserAddress.belongsTo(User, { foreignKey: "ref_user_id" });

ProductVariant.hasMany(TransactionDetail, { foreignKey: 'ref_product_variant_id' });
TransactionDetail.belongsTo(ProductVariant, { foreignKey: 'ref_product_variant_id' });

// TransactionHeader.belongsTo(Voucher, { 
//   foreignKey: 'ref_voucher_code', // Foreign key in TransactionHeader
//   targetKey: 'voucherCode',       // Correct model attribute in Voucher
//   onDelete: 'SET NULL',
//   onUpdate: 'CASCADE',
// });

// Voucher.hasMany(TransactionHeader, { 
//   foreignKey: 'ref_voucher_code', // Foreign key in TransactionHeader
//   sourceKey: 'voucherCode',       // Correct model attribute in Voucher
//   onDelete: 'SET NULL',
//   onUpdate: 'CASCADE',
// });

UserAddress.hasOne(TransactionHeader, { foreignKey: 'ref_address_id' });
TransactionHeader.belongsTo(UserAddress, { foreignKey: 'ref_address_id' });

export { PaymentMethod, TransactionDetail, TransactionHeader, User, ProductVariant, Voucher, Wishlist, WishlistItem, UserAddress }