import { createProductService, deleteProductService, getProductByIdService, getProductsService } from "../services/product.service.js";
import { createProductColorService } from "../services/productColor.service.js";
import { createProductVariantService, updatePromoService } from "../services/productVariantService.js";
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

        var idx = 0;
        variants.forEach(variant => {
            if (variant.productColors.length === 0) {
                variant.productImage = `/${UPLOAD_FOLDER}${productName}/${images[idx].filename}`
                idx++;
            }
            else {
                variant.productColors.forEach(color => {
                    color.productImage = `/${UPLOAD_FOLDER}${productName}/${images[idx].filename}`
                    idx++;
                })
            }
        })

        const product = await createProductService(productName, productDescription, productCategoryName);
        if (variants.length > 0) {
            const variantPromises = variants.map(async (variant) => {
                // put variant.product_image to ../assets/[date] - [name] and get the path
                console.log(variant);
                const productVariant = await createProductVariantService(product.productId, variant);
                
                const colors = variant.productColors;
                if (colors.length > 0) {
                    const colorPromises = colors.map(async (color) => {
                        const productColor = await createProductColorService(productVariant.productVariantId, color);
                    })
                    await Promise.all(colorPromises);
                }
                console.log(images);
                
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

export const updatePromo = async (req, res) => {
    const id = req.params.id;
    const { productPromo, productPromoExpiry } = req.body
    console.log(productPromo, productPromoExpiry);
    if (!id) {
        return res.status(400).json({ message: "Id is required" })
    }

    if (productPromo < 0) {
        return res.status(400).json({ message: "Product promo cannot be minus" });
    }
    else if (new Date(productPromoExpiry).getTime() - new Date().getTime() < 24 * 60 * 60 * 1000) {
        return res.status(400).json({ message: "Product promo expiry must tommorow or more" });
    }

    try {
        const updatedProduct = await updatePromoService(id, productPromo, productPromoExpiry);
        console.log(updatedProduct);
        return res.status(200).json({ message: "Promo updated!" })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
}