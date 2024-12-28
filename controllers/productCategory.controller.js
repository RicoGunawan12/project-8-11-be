import { createCategoryService, deleteCategoryService, getCategoriesService, updateCategoryService } from "../services/productCategory.service.js";
import { UPLOAD_FOLDER } from "../utils/uploader.js";


export const getCategories = async (req, res) => {
    var { search } = req.query
    if (!search) {
        search = '';
    }
    const categories = await getCategoriesService(search);
    return res.status(200).json(categories)
}

export const createCategory = async (req, res) => {
    const { productCategoryName } = req.body;
    const productCategoryPhoto = req.files['productCategoryPhoto']

    const productCategoryPhotoString = `/${UPLOAD_FOLDER}category/${productCategoryPhoto[0].filename}`
    try {
        const insertedCategory = await createCategoryService(productCategoryName, productCategoryPhotoString);
        return res.status(200).json({ message: "New category added!"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    if (!categoryId) {
        return res.status(400).json({ message: "Category Id must be filled" });
    }

    try {
        await deleteCategoryService(categoryId);
        return res.status(200).json({ message: "Category deleted!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    const { productCategoryName } = req.body;
    const productCategoryPhoto = req.files['productCategoryPhoto']

    if (!categoryId) {
        return res.status(400).json({ message: "Category Id must be filled" });
    }
    else if (productCategoryName.length < 1) {
        return res.status(400).json({ message: "Category name must be filled" })
    }
    

    const productCategoryPhotoString = `/${UPLOAD_FOLDER}category/${productCategoryPhoto[0].filename}`
    try {
        const message = await updateCategoryService(categoryId, productCategoryName, productCategoryPhotoString);
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json({ message: error.message });   
    }
}