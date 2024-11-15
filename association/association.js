
import UserAddress from "../models/userAddress.model.js";
import { Cart, CartItem } from "./cart.association.js";
import { ContentDetail, ContentHeader, Page } from "./content.association.js";
import { Product, ProductCategory, Promo } from "./product.association.js";
import { PaymentMethod, ProductVariant, TransactionDetail, TransactionHeader, User, Voucher, VoucherType, Wishlist, WishlistItem } from "./transaction.association.js"

const PaymentMethodModel = PaymentMethod;
const TransactionDetailModel = TransactionDetail
const TransactionHeaderModel = TransactionHeader
const UserModel = User
const UserAddressModel = UserAddress;
const ProductVariantModel = ProductVariant
const VoucherModel = Voucher
const VoucherTypeModel = VoucherType


const ProductModel = Product
const ProductCategoryModel = ProductCategory
const PromoModel = Promo

const CartModel = Cart
const CartItemModel = CartItem
const WishlistModel = Wishlist
const WishlistItemModel = WishlistItem

const ContentHeaderModel = ContentHeader
const ContentDetailModel = ContentDetail
const PageModel = Page

export { 
    PaymentMethodModel, 
    TransactionDetailModel, 
    TransactionHeaderModel, 
    UserModel, 
    UserAddressModel,
    ProductVariantModel, 
    VoucherModel, 
    VoucherTypeModel, 
    ProductModel, 
    ProductCategoryModel, 
    PromoModel, 
    CartModel, 
    CartItemModel,
    WishlistModel,
    WishlistItemModel
};