import { RatingModel, UserModel } from "../association/association.js"


export const getRatingByProductService = async (productId) => {
    const ratings = await RatingModel.findAll({ 
        where: { productId: productId },
        attributes: ['rating', 'comment'],
        include: [
            {
                model: UserModel,
                attributes: ['username']
            }
        ]
    })
    return ratings
}

export const insertRatingService = async (userId, productId, rating, comment) => {
    const insertedRating = await RatingModel.create({ userId, productId, rating, comment });
    return insertedRating;
}