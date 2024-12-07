import { createProductService, deleteProductService, getProductByIdService, getProductsService } from "../services/product.service.js";
import { createProductVariantService, updateProductQuantityService, updatePromoService } from "../services/productVariantService.js";
import { BASE_URL, UPLOAD_FOLDER } from "../utils/uploader.js";

export const getProducts = async (req, res) => {
    var { search, category, limit } = req.query;
    if (!search) {
        search = ""
    }
    if (!category) {
        category = ""
    }
    try {
        const products = await getProductsService(search, category, limit);
        
        return res.status(200).json(products) ;
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getProductById = async (req, res) => {
    const id = req.params.id;
    
    if (!id) {
        return res.status(400).json({ message: "Product id is required" })
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
        const defaultImage = req.files['defaultImage']
        const { productName, productDescription, productCategoryName, productVariants } = req.body;
        
        const hash = new Map();
        images.forEach((image) => {
            console.log("img: " + image.originalname.replace(/\.[^/.]+$/, ""));
            
            hash.set(image.originalname.substring(0, image.originalname.length - 4), `/${UPLOAD_FOLDER}${productName}/${image.filename}`);
        });
        
        
        if (productName.length < 1) {
            return res.status(400).json({ message: "Product name must be filled" })
        }

        const variants = JSON.parse(productVariants);
        variants.forEach((variant) => {
            console.log(productName + " - " + variant.productSize + " - " + variant.productColor);
            
            console.log("hash: " + hash.get(productName + " - " + variant.productSize + " - " + variant.productColor));
            
            variant.productImage = hash.get(productName + " - " + variant.productSize + " - " + variant.productColor);
        });

        // console.log(defaultImage);
        const defaultImageString = `/${UPLOAD_FOLDER}${productName}/${defaultImage[0].filename}`
        const product = await createProductService(productName, productDescription, productCategoryName, defaultImageString);
        const insertVariantPromise = variants.map(async (variant) => {
            console.log("product id: " + product.productId);
            
            await createProductVariantService(product.productId, variant);
        })
        await Promise.all(insertVariantPromise);
        
        return res.status(200).json({ message: "New product added!", product });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



export const deleteProduct = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: "Product id is required" })
    }

    try {
        const deletedProduct = await deleteProductService(id);
        return res.status(200).json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateProductQuantity = async (req, res) => {
    const productVariantId = req.params.id;
    const { quantity } = req.body;
    
    if (!productVariantId) {
        return res.status(400).json({ message: "Product id is required!" });
    }
    else if (!quantity && quantity <= 0) {
        return res.status(400).json({ message: "Quantity must be more thant 0" });    
    }
    
    try {
        const updatedProduct = await updateProductQuantityService(productVariantId, quantity);
        return res.status(200).json({ message: "Quantity updated!", updatedProduct });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updatePromo = async (req, res) => {
    const id = req.params.id;
    const { productPromo, productPromoExpiry } = req.body
    console.log(productPromo, productPromoExpiry);
    if (!id) {
        return res.status(400).json({ message: "Product id is required" })
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