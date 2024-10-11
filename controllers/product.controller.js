import { createProductService, deleteProductService, getProductByIdService, getProductsService } from "../services/product.service.js";
import { createProductColorService } from "../services/productColor.service.js";
import { createProductVariantService } from "../services/productVariantService.js";
import { BASE_URL, UPLOAD_FOLDER } from "../utils/uploader.js";

export const getProducts = async (req, res) => {
    const products = await getProductsService();
    return res.status(200).json(products) ;
}

export const getProductById = async (req, res) => {
    const id = req.params.id;
    
    if (!id) {
        return res.status(400).json({ message: "Id is required" })
    }

    try {
        const product = await getProductByIdService(id);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        const images = req.files['productImage'];
        
        const { productName, productDescription, productCategoryName, productVariants } = req.body;
        const variants = JSON.parse(productVariants);

        if (productName.length < 1) {
            return res.status(400).json({ message: "Product name must be filled" })
        }

        const product = await createProductService(productName, productDescription, productCategoryName);
        if (variants.length > 0) {
            const variantPromises = variants.map(async (variant, index) => {
                // put variant.product_image to ../assets/[date] - [name] and get the path
                if (variant.productColors.length === 0) {
                    variant.productImage = `/${UPLOAD_FOLDER}${images[index].filename}`;
                }
                const productVariant = await createProductVariantService(product.productId, variant);
                
                const colors = variant.productColors;
                if (colors.length > 0) {
                    const colorPromises = colors.map(async (color, index) => {
                        color.productImage = `/${UPLOAD_FOLDER}${images[index].filename}`;
                        const productColor = await createProductColorService(productVariant.productVariantId, color);
                    })
                    await Promise.all(colorPromises);
                }
            });
            await Promise.all(variantPromises);
        }
        
        return res.status(200).json({ message: "New product added!", product });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: "Id is required" })
    }

    try {
        const deletedProduct = await deleteProductService(id);
        return res.status(200).json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}