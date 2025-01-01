
import UserAddress from "../models/userAddress.model.js";
import { Cart, CartItem } from "./cart.association.js";
import { ContentDetail, ContentHeader, Page } from "./content.association.js";
import { ProductCategory, Rating } from "./product.association.js";
import { PromoDetail, Product, Promo } from "./promo.association.js";
import { PaymentMethod, ProductVariant, TransactionDetail, TransactionHeader, User, Voucher, Wishlist, WishlistItem } from "./transaction.association.js"

const PaymentMethodModel = PaymentMethod;
const TransactionDetailModel = TransactionDetail
const TransactionHeaderModel = TransactionHeader
const UserModel = User
const UserAddressModel = UserAddress;
const ProductVariantModel = ProductVariant
const VoucherModel = Voucher
const RatingModel = Rating


const ProductModel = Product
const ProductCategoryModel = ProductCategory
const PromoModel = Promo
const PromoDetailModel = PromoDetail

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
    ProductModel, 
    ProductCategoryModel, 
    PromoModel, 
    CartModel, 
    CartItemModel,
    WishlistModel,
    WishlistItemModel,
    PromoDetailModel,
    RatingModel
};