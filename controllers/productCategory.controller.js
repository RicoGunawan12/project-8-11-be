import {
  createCategoryService,
  deleteCategoryService,
  getCategoriesService,
  updateCategoryService,
} from "../services/productCategory.service.js";
import { convertImageToWebp } from "../utils/imageconverter.js";
import { UPLOAD_FOLDER } from "../utils/uploader.js";

export const getCategories = async (req, res) => {
  let { search, limit } = req.query;

  search = search || "";

  limit = limit ? parseInt(limit, 10) : null;

  const categories = await getCategoriesService(search, limit);
  return res.status(200).json(categories);
};

export const createCategory = async (req, res) => {
  const { productCategoryName } = req.body;
  const productCategoryPhoto = req.files["productCategoryPhoto"];

  // converts image to WebP format
  let productCategoryPhotoString = '';
  for (let i = 0; i < productCategoryPhoto.length; i++) {
    const image = productCategoryPhoto[i];

    const filename = `${Date.now()}-${req.body.productCategoryName}.webp`;
    const convertedImageData = await convertImageToWebp("../" + UPLOAD_FOLDER + "category", image, filename);

    if (i === 0) productCategoryPhotoString = `/${UPLOAD_FOLDER}category/${filename}`;
  }
  
  try {
    const insertedCategory = await createCategoryService(
      productCategoryName,
      productCategoryPhotoString
    );
    return res.status(200).json({ message: "New category added!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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
};

export const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { productCategoryName } = req.body;
  const productCategoryPhoto = req.files["productCategoryPhoto"];

  if (!categoryId) {
    return res.status(400).json({ message: "Category Id must be filled" });
  } else if (productCategoryName.length < 1) {
    return res.status(400).json({ message: "Category name must be filled" });
  }

  // converts image to WebP format
  let productCategoryPhotoString = '';
  for (let i = 0; i < productCategoryPhoto.length; i++) {
    const image = productCategoryPhoto[i];

    const filename = `${Date.now()}-${req.body.productCategoryName}.webp`;
    const convertedImageData = await convertImageToWebp("../" + UPLOAD_FOLDER + "category", image, filename);

    if (i === 0) productCategoryPhotoString = `/${UPLOAD_FOLDER}category/${filename}`;
  } 
  
  try {
    const message = await updateCategoryService(
      categoryId,
      productCategoryName,
      productCategoryPhotoString
    );
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCategories = async (req, res) => {
  const { productCategoryId } = req.body;

  try {
    await deleteCategoryService(productCategoryId);
    return res.status(200).json({ message: "Category deleted!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
