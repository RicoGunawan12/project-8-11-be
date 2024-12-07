export const categorySchema = {
    productCategoryName: {
        isString: true,
        notEmpty: {
        errorMessage: 'Category Name is required',
        },
        isLength: {
        options: { min: 3 },
        errorMessage: 'Category Name must be at least 3 characters long',
        }
    }
};