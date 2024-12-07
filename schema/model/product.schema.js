export const productSchema = {
    productCategoryName: {
        isString: true,
        notEmpty: {
            errorMessage: 'Category Name is required',
        }
    },
    productName: {
        isString: true,
        notEmpty: {
            errorMessage: 'Product Name is required',
        }
    },
    productDescription: {
        isString: true,
        notEmpty: {
            errorMessage: 'Product Description is required',
        }
    }
};