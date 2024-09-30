import PaymentMethod from "../models/paymentMethod.model.js";
import TransactionDetail from "../models/transactionDetail.model.js";
import TransactionHeader from "../models/transactionHeader.model.js";
import Voucher from "../models/voucher.model.js";
import VoucherType from "../models/voucherType.model.js";
import Wishlist from "../models/wishlist.model.js";
import WishlistItem from "../models/wishlistItem.model.js";
import { ProductVariant, User } from "./cart.association.js";


PaymentMethod.hasMany(TransactionHeader, { foreignKey: 'ref_payment_method_id' });
TransactionHeader.belongsTo(PaymentMethod, { foreignKey: 'ref_payment_method_id' });

TransactionHeader.hasMany(TransactionDetail, { foreignKey: 'ref_transaction_id' });
TransactionDetail.belongsTo(TransactionHeader, { foreignKey: 'ref_transaction_id' });

User.hasMany(TransactionHeader, { foreignKey: 'ref_user_id' });
TransactionHeader.belongsTo(User, { foreignKey: 'ref_user_id' });

Wishlist.belongsTo(User, { foreignKey: 'ref_user_id' });
User.belongsTo(Wishlist, { foreignKey: 'ref_user_id' });

Wishlist.hasMany(WishlistItem, { foreignKey: 'ref_wishlist_id' });
WishlistItem.belongsTo(Wishlist, { foreignKey: 'ref_wishlist_id' });

ProductVariant.hasMany(WishlistItem, { foreignKey: 'ref_product_variant_id' });
WishlistItem.belongsTo(ProductVariant, { foreignKey: 'ref_product_variant_id' });

ProductVariant.hasMany(TransactionDetail, { foreignKey: 'ref_product_variant_id' });
TransactionDetail.belongsTo(ProductVariant, { foreignKey: 'ref_product_variant_id' });

TransactionHeader.belongsTo(Voucher, { foreignKey: 'ref_voucher_id' });
Voucher.hasMany(TransactionHeader, { foreignKey: 'ref_voucher_id' });

VoucherType.hasMany(Voucher, { foreignKey: 'ref_voucher_type_id' });
Voucher.belongsTo(VoucherType, { foreignKey: 'ref_voucher_type_id' });

export { PaymentMethod, TransactionDetail, TransactionHeader, User, ProductVariant, Voucher, VoucherType, Wishlist, WishlistItem }