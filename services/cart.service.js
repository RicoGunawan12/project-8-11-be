import { Op } from "sequelize";
import {
  BogoModel,
  CartItemModel,
  CartModel,
  ProductModel,
  ProductVariantModel,
  PromoDetailModel,
  PromoHistoryModel,
  PromoModel,
} from "../association/association.js";
import ProductVariant from "../models/productVariant.model.js";

export const createCart = async (userId) => {
  const cart = await CartModel.create({ userId });
  return cart;
};

export const getCart = async (userId) => {
  const cart = await CartModel.findOne({
    where: { userId: userId },
  });
  return cart;
};

export const getCartItemsByUserService = async (userId) => {
  console.log("cartttt");

  const cartItem = await CartItemModel.findAll({
    include: [
      {
        model: CartModel,
        where: { userId: userId },
        attributes: [],
      },
      {
        model: ProductVariantModel,
        include: [
          {
            model: ProductModel,
            attributes: [
              "productId",
              "productName",
              "productWeight",
              "productSize",
            ],
            include: [
              {
                model: PromoDetailModel,
                attributes: ["promoDetailId"],
                include: [
                  {
                    model: PromoModel,
                    where: {
                      startDate: {
                        [Op.lte]: new Date(),
                      },
                      endDate: {
                        [Op.gte]: new Date().setHours(0, 0, 0, 0),
                      },
                    },
                    order: [["created_at", "DESC"]],
                  }
                ]
              }, {
                model: BogoModel
              }
            ]
          }],
      }
    ]
  });

  const filteredCartItems = await Promise.all(
    cartItem.map(async (cartItem) => {
      // console.log(item.product_variant.product.promo_details[0].promo.promoId);
      const item = cartItem.get({ plain: true });
      const sortedPromo = item?.product_variant?.product?.promo_details.sort((a, b) => new Date(b.promo.createdAt) - new Date(a.promo.createdAt));
      console.log(sortedPromo);

      const promoDetail = sortedPromo[0];
      console.log("PROMO DETAIL HEREE");
      console.log(promoDetail);

      if (promoDetail) {
        console.log(promoDetail.promo.promoId);
        console.log(item.product_variant.product.productId);
        console.log(userId);

        const promoUsed = await PromoHistoryModel.findOne({
          where: {
            promoId: promoDetail.promo.promoId,
            productId: item.product_variant.product.productId,
            userId,
          },
        });

        if (promoUsed) {
          // Remove the promo if it has been used
          // console.log(item.product_variant.product.promo_details);

          // item.product_variant.product.promo_details.pop();
          // delete
          item.product_variant.product.promo_details = [];
        }
      }
      console.log("this is different", item.product_variant.product.bogos[0])
      const bogo = item.product_variant.product.bogos[0];

      if (bogo) {
        console.log("VARIANT: ", bogo.variant);

        const listVariant = bogo.variant.split(",");
        console.log("list variant: ", listVariant);

        const bogoVar = [];

        for (const element of listVariant) {
          const varResult = await ProductVariantModel.findOne({
            where: {
              productVariantId: element,
            },
          });

          bogoVar.push(varResult);
        }

        item.product_variant.product.bogo = bogoVar;
      } else {
        console.log("No variant found in bogo");
      }

      return item;
    })
  );
  console.log("this is filtered cart items");
  console.log(filteredCartItems);
  return filteredCartItems;
  // return cartItem;
};

export const addCartItemService = async (
  userId,
  productVariantId,
  quantity
) => {
  const productVariant = await ProductVariantModel.findOne({
    where: { productVariantId },
  });
  // console.log(productVariant);

  if (productVariant.productStock < quantity) {
    throw new Error("There are only " + productVariant.productStock + " stock");
  }

  const cart = await CartModel.findOne({ where: { userId } });

  const cartItemInDB = await CartItemModel.findOne({
    where: {
      cartId: cart.cartId,
      productVariantId: productVariantId,
    },
  });

  if (cartItemInDB) {
    if (cartItemInDB.quantity == quantity) {
      return;
    } else {
      const cartItem = await CartItemModel.update(
        { quantity: quantity },
        { where: { cartId: cart.cartId, productVariantId: productVariantId } }
      );
      return;
    }
  }
  const cartId = cart.cartId;
  const cartItem = await CartItemModel.create({
    cartId,
    productVariantId,
    quantity,
  });

  return cartItem;
};

export const removeCartItemService = async (cartItemId) => {
  const removedCartItem = await CartItemModel.destroy({
    where: { cartItemId },
  });
  return removedCartItem;
};

export const updateCartItemService = async (cartItemId, quantity) => {
  const getProductVariant = await CartItemModel.findOne({
    where: { cartItemId },
    include: {
      model: ProductVariantModel,
    },
  });

  if (getProductVariant.product_variant.productStock < quantity) {
    throw new Error(
      "There are only " +
      getProductVariant.product_variant.productStock +
      " stock"
    );
  }

  const updateCartItem = await CartItemModel.update(
    { quantity: quantity },
    { where: { cartItemId } }
  );
  return updateCartItem;
};

export const removeAllCartItemInUserService = async (userId) => {
  const userCart = await getCart(userId);
  const deletedCartItem = await CartItemModel.destroy({
    where: {
      cartId: userCart.cartId,
    },
  });
  return deletedCartItem;
};
