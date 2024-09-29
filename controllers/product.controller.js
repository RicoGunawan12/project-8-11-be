import { createProductService, getProductByIdService, getProductsService } from "../services/product.service.js";
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
        const images = req.files['product_image'];
        const { product_name, product_description, category_name, product_variants } = req.body;
        const productVariants = JSON.parse(product_variants);

        if (product_name.length < 1) {
            return res.status(400).json({ message: "Product name must be filled" })
        }

        const product = await createProductService(product_name, product_description, category_name);
        productVariants.forEach(async (variant, index) => {
            // put variant.product_image to ../assets/[date] - [name] and get the path
            variant.product_image = `/${UPLOAD_FOLDER}${images[index].filename}`;
            await createProductVariantService(product.product_id, variant);
        });
        return res.status(200).json({ message: "New product added!", product });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}