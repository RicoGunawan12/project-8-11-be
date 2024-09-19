import { createProductService, getProductsService } from "../services/product.service.js";


export const getProducts = async (req, res) => {
    const products = await getProductsService();
    return res.status(200).json(products) ;
}

export const createProduct = async (req, res) => {
    const { product_name, product_description, category_name } = req.body;

    if (product_name.length < 1) {
        return res.status(400).json({ message: "Product name must be filled" })
    }
    
    try {
        const product = await createProductService(product_name, product_description, category_name);
        return res.status(200).json({ message: "New product added!", product });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}