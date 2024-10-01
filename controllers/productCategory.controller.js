import { createCategoryService, getCategoriesService } from "../services/productCategory.service.js";


export const getCategories = async (req, res) => {
    const { search } = req.query
    const categories = await getCategoriesService(search);
    return res.status(200).json(categories)
}

export const createCategory = async (req, res) => {
    const { category } = req.body;
    
    if (category.length < 1) {
        return res.status(400).json({ message: "Category length must be filled" });
    }

    try {
        const insertedCategory = await createCategoryService(category);
        return res.status(200).json({ message: "New category added!"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}