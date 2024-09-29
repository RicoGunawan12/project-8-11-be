import { Cart, CartItem } from "./cart.association.js";
import { Product, ProductCategory, Promo } from "./product.association.js";
import { PaymentMethod, ProductVariant, TransactionDetail, TransactionHeader, User, Voucher, VoucherType } from "./transaction.association.js"

const PaymentMethodModel = PaymentMethod;
const TransactionDetailModel = TransactionDetail
const TransactionHeaderModel = TransactionHeader
const UserModel = User
const ProductVariantModel = ProductVariant
const VoucherModel = Voucher
const VoucherTypeModel = VoucherType


const ProductModel = Product
const ProductCategoryModel = ProductCategory
const PromoModel = Promo

const CartModel = Cart
const CartItemModel = CartItem


export { PaymentMethodModel, TransactionDetailModel, TransactionHeaderModel, UserModel, ProductVariantModel, VoucherModel, VoucherTypeModel, ProductModel, ProductCategoryModel, PromoModel, CartModel, CartItemModel };