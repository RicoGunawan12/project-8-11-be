import { createProductService, deleteProductService, getBestSellerService, updatePromoService, getProductByIdService, getProductCountService, getProductPaginationService, getProductsService, updateBestSellerService } from "../services/product.service.js";
import { createProductVariantService, updateProductQuantityService, updateVariantService } from "../services/productVariantService.js";
import { BASE_URL, UPLOAD_FOLDER } from "../utils/uploader.js";
import { isValidDate } from "../utils/utility.js";

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

export const getPaginateProduct = async(req, res) => {
    var {limit, offset, search} = req.query;

    if(limit < 0){
        return res.status(400).json({message: "Limit can't be under 0"})
    }

    if(offset < 0){
        return res.status(400).json({message: "Offset can't be under 0"})
    }

    try{

        const products = await getProductPaginationService(limit, offset, search)
        return res.status(200).json(products)

    } catch (error){
        return res.status(500).json({message: error.message})
    }

}

export const getProductCount = async(req, res) => {

    var {search} = req.query;

    try {
        const count = await getProductCountService(search)
        return res.status(200).json({total : count})
    } catch (error) {
        return res.status(500).json({message: error.message})
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

export const updateVariant = async (req, res) => {
    const updates = req.body;
    try {
        if (!Array.isArray(updates) || updates.length === 0) {
            return res.status(400).json({ message: 'Invalid input: Expected a non-empty array.' });
        }

        const updatePromises = updates.map(async (update) => {
            const { productVariantId, ...fieldsToUpdate } = update;

            if (!productVariantId) {
                throw new Error('productVariantId is required for each update.');
            }

            const variant = await updateVariantService(productVariantId, fieldsToUpdate);
        });

        await Promise.all(updatePromises);

        res.status(200).json({ message: 'Update variant successful' });
    } catch (error) {
        console.error('Bulk update error:', error);
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
}

export const updatePromo = async (req, res) => {
    const id = req.params.id;
    const { isPromo, productPromo, startDate, endDate } = req.body
    if (!id) {
        return res.status(400).json({ message: "Product id is required" })
    }
    
    if (isPromo === undefined) {
        return res.status(400).json({ message: "Is Promo must be filled" })
    }
    else if (isPromo === true && productPromo <= 0) {
        return res.status(400).json({ message: "Product promo must be filled" });
    }
    else if (productPromo < 0) {
        return res.status(400).json({ message: "Product promo cannot be minus" });
    }
    else if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate and endDate are required' });
    }
    else if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start > end) {
        return res.status(400).json({ error: 'startDate must be before endDate' });
    }
    else if (start < today || end < today) {
        return res.status(400).json({ error: 'Dates must not be in the past' });
    }    

    try {
        const updatedProduct = await updatePromoService(id, isPromo, productPromo, startDate, endDate);
        return res.status(200).json({ message: "Promo updated!" })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
}

export const updateBestSeller = async (req, res) => {
    const { isBestSeller } = req.body;
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: "Product id is required" })
    }

    try {
        const updatedProduct = await updateBestSellerService(id, isBestSeller);
        return res.status(200).json({ message: "Promo updated!" })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getBestSeller = async (req, res) => {
    console.log("asdasd");
    const bestSellerProduct = await getBestSellerService();
    
    return res.status(200).json({ message: "Product fetched!", bestSellerProduct })
    // try {
    // } catch (error) {
    //     return res.status(500).json({ message: error.message });
    // }
}