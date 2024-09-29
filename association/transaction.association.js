import PaymentMethod from "../models/paymentMethod.model.js";
import TransactionDetail from "../models/transactionDetail.model.js";
import TransactionHeader from "../models/transactionHeader.model.js";
import Voucher from "../models/voucher.model.js";
import VoucherType from "../models/voucherType.model.js";
import { ProductVariant, User } from "./cart.association.js";


PaymentMethod.hasMany(TransactionHeader, { foreignKey: 'paymentMethodId' });
TransactionHeader.belongsTo(PaymentMethod, { foreignKey: 'paymentMethodId' });

TransactionHeader.hasMany(TransactionDetail, { foreignKey: 'transactionId' });
TransactionDetail.belongsTo(TransactionHeader, { foreignKey: 'transactionId' });

User.hasMany(TransactionHeader, { foreignKey: 'userId' });
TransactionHeader.belongsTo(User, { foreignKey: 'userId' });

ProductVariant.hasMany(TransactionDetail, { foreignKey: 'productVariantId' });
TransactionDetail.hasMany(ProductVariant, { foreignKey: 'productVariantId' });

TransactionHeader.belongsTo(Voucher, { foreignKey: 'voucherId' });
Voucher.belongsTo(TransactionHeader, { foreignKey: 'voucherId' });

VoucherType.hasMany(Voucher, { foreignKey: 'voucherId' });
Voucher.belongsTo(VoucherType, { foreignKey: 'voucherId' });

export { PaymentMethod, TransactionDetail, TransactionHeader, User, ProductVariant, Voucher, VoucherType }