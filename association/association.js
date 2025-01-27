
import { Bogo } from "./bogo.association.js";
import { Cart, CartItem } from "./cart.association.js";
import { ContentDetail, ContentHeader, Page } from "./content.association.js";
import { ProductCategory, ProductCover, Rating } from "./product.association.js";
import { PromoDetail, Product, Promo, User, PromoHistory } from "./promo.association.js";
import { PaymentMethod, ProductVariant, TransactionDetail, TransactionHeader, UserAddress, Voucher, Wishlist, WishlistItem } from "./transaction.association.js"

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
const PromoHistoryModel = PromoHistory

const CartModel = Cart
const CartItemModel = CartItem
const WishlistModel = Wishlist
const WishlistItemModel = WishlistItem

const ContentHeaderModel = ContentHeader
const ContentDetailModel = ContentDetail
const PageModel = Page
const ProductCoverModel = ProductCover
const BogoModel = Bogo

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
    RatingModel,
    ProductCoverModel,
    PromoHistoryModel,
    BogoModel,
};