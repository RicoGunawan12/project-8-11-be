import { readExcelFile } from "../services/excel.service.js";
import {
  createProductService,
  deleteProductService,
  getBestSellerService,
  updatePromoService,
  getProductByIdService,
  getProductCountService,
  getProductPaginationService,
  getProductsService,
  updateBestSellerService,
  updateProductService,
  getNewestProductsService,
  deleteProductsService,
  updateActivityStatusService,
  getProductByIdWithRelatedProductService,
  generateUpdateStockExcelService,
} from "../services/product.service.js";
import { getCategoryWithProductService } from "../services/productCategory.service.js";
import {
  createProductVariantService,
  updateProductQuantityService,
  updateProductVariantService,
  updateVariantService,
} from "../services/productVariantService.js";
import { convertImageToWebp } from "../utils/imageconverter.js";
import { BASE_URL, UPLOAD_FOLDER } from "../utils/uploader.js";
import { isValidDate, isValidNumber } from "../utils/utility.js";

export const getProducts = async (req, res) => {
  var { search, category, limit, status } = req.query;
  if (!search) {
    search = "";
  }
  if (!category) {
    category = "";
  }
  if (!status) {
    status = "active";
  }

  try {
    const products = await getProductsService(search, category, limit, status);

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPaginateProduct = async (req, res) => {
  var { limit, offset, search, category } = req.query;

  if (limit < 0) {
    return res.status(400).json({ message: "Limit can't be under 0" });
  }

  if (offset < 0) {
    return res.status(400).json({ message: "Offset can't be under 0" });
  }

  if (!category) {
    category = "";
  }

  try {
    const products = await getProductPaginationService(
      limit,
      offset,
      search,
      category
    );

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductCount = async (req, res) => {
  var { search, category } = req.query;

  try {
    const count = await getProductCountService(search, category);
    return res.status(200).json({ total: count });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Product id is required" });
  }

  try {
    const product = await getProductByIdService(id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductByIdWithRelatedProduct = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Product id is required" });
  }

  try {
    const { product, relatedProducts, ratingDistributionObject } = await getProductByIdWithRelatedProductService(id);
    return res.status(200).json({ product, relatedProducts, ratingDistributionObject });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getNewestProduct = async (req, res) => {
  try {
    const products = await getNewestProductsService();
    return res.status(200).json({ message: "Product fetched!", products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const validateProduct = (req, res, next) => {
  const {
    productName,
    productDescription,
    productCategoryName,
    productVariants
  } = req.body;

  // Validate productName
  if (
    !productName ||
    typeof productName !== "string" ||
    productName.trim() === ""
  ) {
    return res
      .status(400)
      .json({
        message: "Product name is required and must be a non-empty string.",
      });
  }

  // Validate productDescription
  if (
    !productDescription ||
    typeof productDescription !== "string" ||
    productDescription.trim() === ""
  ) {
    return res
      .status(400)
      .json({
        message:
          "Product description is required and must be a non-empty string.",
      });
  }

  if(
    !productSize ||
    typeof productSize !== "number" ||
    productSize.trim() === ""
  )
  return res.status(400).json({
    message: "Product size is required and must be greater than 0"
  })

  // Validate productCategoryName
  if (
    !productCategoryName ||
    typeof productCategoryName !== "string" ||
    productCategoryName.trim() === ""
  ) {
    return res
      .status(400)
      .json({
        message:
          "Product category name is required and must be a non-empty string.",
      });
  }

  // Validate productVariants
  try {
    const variants = JSON.parse(productVariants); // Parse the JSON string
    if (!Array.isArray(variants) || variants.length === 0) {
      return res
        .status(400)
        .json({ message: "Product variants must be a non-empty array." });
    }

    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];
      if (
        !variant.productColor ||
        typeof variant.productColor !== "string" ||
        variant.productColor.trim() === ""
      ) {
        return res
          .status(400)
          .json({ message: `Variant at index ${i} must have a valid color.` });
      }
      if (
        !variant.productPrice ||
        typeof variant.productPrice !== "number" ||
        variant.productPrice <= 0
      ) {
        return res
          .status(400)
          .json({
            message: `Variant price at index ${i} must be a positive number.`,
          });
      }
      if (
        !variant.productStock ||
        typeof variant.productStock !== "number" ||
        variant.productStock <= 0
      ) {
        return res
          .status(400)
          .json({
            message: `Variant stock at index ${i} must be a positive number.`,
          });
      }
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Product variants must be a valid JSON string." });
  }

  // Validate images
  if (
    !req.files ||
    !req.files["productImage"] ||
    req.files["productImage"].length === 0
  ) {
    return res
      .status(400)
      .json({ message: "At least one product image is required." });
  }
  if (!req.files["defaultImage"] || req.files["defaultImage"].length === 0) {
    return res.status(400).json({ message: "Default image is required." });
  }

  // If all validations pass
  next();
};

export const createProduct = async (req, res) => {
  try {
    const images = req.files["productImage"];
    const defaultImage = req.files["defaultImage"];
    var {
      productName,
      productDescription,
      productCategoryName,
      productVariants,
      productSize,
      productCode,
      productWeight,
      productLength,
      productWidth,
      productHeight,
    } = req.body;

    if (
      !productName ||
      typeof productName !== "string" ||
      productName.trim().length < 1
    ) {
      return res.status(400).json({ message: "Product name must be filled" });
    }

    // Manual validation for productDescription
    // if (!productDescription || typeof productDescription !== "string" || productDescription.trim().length < 1) {
    //     return res.status(400).json({ message: "Product description must be a non-empty string" });
    // }

    // Manual validation for productCategoryName
    if (
      !productCategoryName ||
      typeof productCategoryName !== "string" ||
      productCategoryName.trim().length < 1
    ) {
      return res
        .status(400)
        .json({ message: "Product category name must be filled" });
    }
    if (
      !productSize ||
      typeof productSize !== "string" ||
      productSize.trim().length < 1
    ) {
      throw new Error(`Variant ${index + 1} must have product size`);
    }
    if (
      !productCode ||
      typeof productCode !== "string" ||
      productCode.trim().length < 1
    ) {
      return res.status(400).json({ message: "Product code must be filled" });
    }
    if (
      isValidNumber(productWeight) &&
      isValidNumber(productLength) &&
      isValidNumber(productWidth) &&
      isValidNumber(productHeight)
    ) {
      // Proceed with handling the data
      productWeight = parseInt(productWeight);
      productLength = parseInt(productLength);
      productWidth = parseInt(productWidth);
      productHeight = parseInt(productHeight);
    } else {
      res
        .status(400)
        .json({
          message:
            "Product weight, length, width, and height must be a valid number",
        });
    }
    if (typeof productWeight !== "number" || productWeight <= 0) {
      return res
        .status(400)
        .json({ message: `Product weight must be greater than 0` });
    }
    if (typeof productLength !== "number" || productLength <= 0) {
      return res
        .status(400)
        .json({ message: `Product length must be greater than 0` });
    }
    if (typeof productWidth !== "number" || productWidth <= 0) {
      return res
        .status(400)
        .json({ message: `Product width must be greater than 0` });
    }
    if (typeof productHeight !== "number" || productHeight <= 0) {
      return res
        .status(400)
        .json({ message: `Product height must be greater than 0` });
    }

    let tempVariants;
    try {
      tempVariants = JSON.parse(productVariants);
      if (!Array.isArray(tempVariants) || tempVariants.length < 1) {
        return res
          .status(400)
          .json({ message: "Product must have at least one variants" });
      }
      const tmpHash = new Map();
      tempVariants.forEach((variant, index) => {
        if (tmpHash.get(variant.productColor) === "found") {
          throw new Error("Duplicate product color!");
        }
        tmpHash.set(variant.productColor, "found");
        if (
          !variant.productColor ||
          typeof variant.productColor !== "string" ||
          variant.productColor.trim().length < 1
        ) {
          throw new Error(`Variant ${index + 1} must have product color`);
        }
        if (
          typeof variant.productPrice !== "number" ||
          variant.productPrice <= 0
        ) {
          throw new Error(
            `Variant ${index + 1} product price must be greater than 0`
          );
        }
        if (
          typeof variant.productStock !== "number" ||
          variant.productStock < 0
        ) {
          throw new Error(
            `Variant ${index + 1} product stock must be greater than 0`
          );
        }
      });
    } catch (error) {
      return res.status(400).json({ message: `${error.message}` });
    }

    if (!images || !Array.isArray(images) || images.length < 1) {
      return res.status(400).json({ message: "Variant image is required" });
    }
    if (
      !defaultImage ||
      !Array.isArray(defaultImage) ||
      defaultImage.length !== 1
    ) {
      return res.status(400).json({ message: "Default image is required" });
    }

    const variants = JSON.parse(productVariants);
    const hash = new Map();
    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      // converts image to WebP format
      const filename = `${Date.now()}-${req.body.productName}.webp`;
      const convertedImageData = await convertImageToWebp("../" + UPLOAD_FOLDER + "product/" + req.body.productName, image, filename);

      hash.set(
        productName + " - " + variants[i].productColor,
        `/${UPLOAD_FOLDER}product/${productName}/${filename}`
      );
    }

    if (productName.length < 1) {
      return res.status(400).json({ message: "Product name must be filled" });
    }

   
    variants.forEach((variant) => {
      variant.productImage = hash.get(
        productName + " - " + variant.productColor
      );
    });

    // console.log(defaultImage);

    // converts image to WebP format
    let defaultImageString = '';
    for (let i = 0; i < defaultImage.length; i++) {
      const image = defaultImage[i];
      const filename = `${Date.now()}-${req.body.productName}.webp`;
      const convertedImageData = await convertImageToWebp("../" + UPLOAD_FOLDER + "product/" + req.body.productName, image, filename);

      if (i === 0) defaultImageString = `/${UPLOAD_FOLDER}product/${productName}/${filename}`;
    }

    const product = await createProductService(
      productName,
      productDescription,
      productCategoryName,
      defaultImageString,
      productSize,
      productCode,
      productWeight,
      productLength,
      productWidth,
      productHeight
    );

    const insertVariantPromise = variants.map(async (variant) => {
      // console.log("product id: " + product.productId);

      const insertedProduct = await createProductVariantService(
        product.productId,
        variant
      );
      console.log(insertedProduct);
    });
    await Promise.all(insertVariantPromise);

    return res.status(200).json({ message: "New product added!", product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const images = req.files["productImage"];
    const defaultImage = req.files["defaultImage"];
    var {
      productName,
      productDescription,
      productCategoryName,
      productVariants,
      productSize,
      productCode,
      productWeight,
      productLength,
      productWidth,
      productHeight,
    } = req.body;
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ message: "Product id is required!" });
    }

    if (
      !productName ||
      typeof productName !== "string" ||
      productName.trim().length < 1
    ) {
      return res.status(400).json({ message: "Product name must be filled" });
    }

    // Manual validation for productDescription
    // if (!productDescription || typeof productDescription !== "string" || productDescription.trim().length < 1) {
    //     return res.status(400).json({ message: "Product description must be a non-empty string" });
    // }

    // Manual validation for productCategoryName
    if (
      !productCategoryName ||
      typeof productCategoryName !== "string" ||
      productCategoryName.trim().length < 1
    ) {
      return res
        .status(400)
        .json({ message: "Product category name must be filled" });
    }
    if (
      !productSize ||
      typeof productSize !== "string" ||
      productSize.trim().length < 1
    ) {
      throw new Error(`Variant ${index + 1} must have product size`);
    }
    if (
      !productCode ||
      typeof productCode !== "string" ||
      productCode.trim().length < 1
    ) {
      return res.status(400).json({ message: "Product code must be filled" });
    }
    if (
      isValidNumber(productWeight) &&
      isValidNumber(productLength) &&
      isValidNumber(productWidth) &&
      isValidNumber(productHeight)
    ) {
      // Proceed with handling the data
      productWeight = parseInt(productWeight);
      productLength = parseInt(productLength);
      productWidth = parseInt(productWidth);
      productHeight = parseInt(productHeight);
    } else {
      res
        .status(400)
        .json({
          message:
            "Product weight, length, width, and height must be a valid number",
        });
    }
    if (typeof productWeight !== "number" || productWeight < 0) {
      return res
        .status(400)
        .json({ message: `Product weight must be greater than 0` });
    }
    if (typeof productLength !== "number" || productLength < 0) {
      return res
        .status(400)
        .json({ message: `Product length must be greater than 0` });
    }
    if (typeof productWidth !== "number" || productWidth < 0) {
      return res
        .status(400)
        .json({ message: `Product width must be greater than 0` });
    }
    if (typeof productHeight !== "number" || productHeight < 0) {
      return res
        .status(400)
        .json({ message: `Product height must be greater than 0` });
    }

    let tempVariants;
    try {
      tempVariants = JSON.parse(productVariants);
      if (!Array.isArray(tempVariants) || tempVariants.length < 1) {
        return res
          .status(400)
          .json({ message: "Product must have at least one variants" });
      }
      tempVariants.forEach((variant, index) => {
        if (
          !variant.productColor ||
          typeof variant.productColor !== "string" ||
          variant.productColor.trim().length < 1
        ) {
          throw new Error(`Variant ${index + 1} must have product color`);
        }
        if (
          typeof variant.productPrice !== "number" ||
          variant.productPrice <= 0
        ) {
          throw new Error(
            `Variant ${index + 1} product price must be greater than 0`
          );
        }
        if (
          typeof variant.productStock !== "number" ||
          variant.productStock < 0
        ) {
          throw new Error(
            `Variant ${index + 1} product stock must be greater than 0`
          );
        }
      });
    } catch (error) {
      return res.status(400).json({ message: `${error.message}` });
    }

    if (!images || !Array.isArray(images) || images.length < 1) {
      return res.status(400).json({ message: "Variant image is required" });
    }
    if (
      !defaultImage ||
      !Array.isArray(defaultImage) ||
      defaultImage.length !== 1
    ) {
      return res.status(400).json({ message: "Default image is required" });
    }

    const hash = new Map();
    console.log(images);

    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      // console.log("img: " + image.originalname.replace(/\.[^/.]+$/, ""));

      // converts image to WebP format
      const filename = `${Date.now()}-${req.body.productName}.webp`;
      const convertedImageData = await convertImageToWebp("../" + UPLOAD_FOLDER + "product/" + req.body.productName, image, filename);

      hash.set(
        image.originalname,
        `/${UPLOAD_FOLDER}product/${productName}/${filename}`
      );
    }

    if (productName.length < 1) {
      return res.status(400).json({ message: "Product name must be filled" });
    }

    const variants = JSON.parse(productVariants);
    variants.forEach((variant) => {
      // console.log(productName + " - " + variant.productSize + " - " + variant.productColor);

      // console.log("hash: " + hash.get(productName + " - " + variant.productSize + " - " + variant.productColor));

      variant.productImage = hash.get(
        productName + " - " + variant.productColor
      );
    });

    // console.log(defaultImage);

    // converts image to WebP format
    let defaultImageString = '';
    for (let i = 0; i < defaultImage.length; i++) {
      const image = defaultImage[i];
      const filename = `${Date.now()}-${req.body.productName}.webp`;
      const convertedImageData = await convertImageToWebp("../" + UPLOAD_FOLDER + "product/" + req.body.productName, image, filename);

      if (i === 0) defaultImageString = `/${UPLOAD_FOLDER}product/${productName}/${filename}`;
    }
    
    const updatedProduct = await updateProductService(
      productId,
      productName,
      productDescription,
      productCategoryName,
      defaultImageString,
      productSize,
      productCode,
      productWeight,
      productLength,
      productWidth,
      productHeight,
      variants
    );

    return res
      .status(200)
      .json({ message: "Product updated!", updatedProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Product id is required" });
  }

  try {
    const deletedProduct = await deleteProductService(id);
    return res
      .status(200)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProductQuantity = async (req, res) => {
  const productVariantId = req.params.id;
  const { quantity } = req.body;

  if (!productVariantId) {
    return res.status(400).json({ message: "Product id is required!" });
  } else if (!quantity && quantity <= 0) {
    return res.status(400).json({ message: "Quantity must be more thant 0" });
  }

  try {
    const updatedProduct = await updateProductQuantityService(
      productVariantId,
      quantity
    );
    return res
      .status(200)
      .json({ message: "Quantity updated!", updatedProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateVariant = async (req, res) => {
  const updates = req.body;
  try {
    if (!Array.isArray(updates) || updates.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid input: Expected a non-empty array." });
    }

    const updatePromises = updates.map(async (update) => {
      const { productVariantId, ...fieldsToUpdate } = update;

      if (!productVariantId) {
        throw new Error("productVariantId is required for each update.");
      }

      const variant = await updateVariantService(
        productVariantId,
        fieldsToUpdate
      );
    });

    await Promise.all(updatePromises);

    res.status(200).json({ message: "Update variant successful" });
  } catch (error) {
    console.error("Bulk update error:", error);
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

export const updatePromo = async (req, res) => {
  const id = req.params.id;
  const { isPromo, productPromo, startDate, endDate } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Product id is required" });
  }

  if (isPromo === undefined) {
    return res.status(400).json({ message: "Is Promo must be filled" });
  } else if (isPromo === true && productPromo <= 0) {
    return res.status(400).json({ message: "Product promo must be filled" });
  } else if (productPromo < 0) {
    return res.status(400).json({ message: "Product promo cannot be minus" });
  } else if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "startDate and endDate are required" });
  } else if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return res
      .status(400)
      .json({ error: "Invalid date format. Use YYYY-MM-DD" });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (start > end) {
    return res.status(400).json({ error: "startDate must be before endDate" });
  } else if (start < today || end < today) {
    return res.status(400).json({ error: "Dates must not be in the past" });
  }

  try {
    const updatedProduct = await updatePromoService(
      id,
      isPromo,
      productPromo,
      startDate,
      endDate
    );
    return res.status(200).json({ message: "Promo updated!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBestSeller = async (req, res) => {
  const { isBestSeller } = req.body;
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Product id is required" });
  }

  try {
    const updatedProduct = await updateBestSellerService(id, isBestSeller);
    return res.status(200).json({ message: "Promo updated!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBestSeller = async (req, res) => {
  try {
    const bestSellerProduct = await getBestSellerService();
    return res
      .status(200)
      .json({ message: "Product fetched!", bestSellerProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCategoryWithProduct = async (req, res) => {
  try {
    const products = await getCategoryWithProductService();
    return res.status(200).json({ message: "Product fetched!", products });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: error.message });
  }
};

export const updateActiveBestSellers = async (req, res) => {
  const { productId } = req.body;

  try {
    const updatedProduct = await updateBestSellerService(productId, true);
    return res.status(200).json({ message: "Product best seller updated!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateInactiveBestSellers = async (req, res) => {
  const { productId } = req.body;

  try {
    const updatedProduct = await updateBestSellerService(productId, false);
    return res.status(200).json({ message: "Product best seller updated!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateActiveStatusProducts = async (req, res) => {
  const { productId } = req.body;

  try {
    const updatedProduct = await updateActivityStatusService(productId, "active");
    return res.status(200).json({ message: "Product best seller updated!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateInactiveStatusProducts = async (req, res) => {
  const { productId } = req.body;

  try {
    const updatedProduct = await updateActivityStatusService(productId, "inactive");
    return res.status(200).json({ message: "Product best seller updated!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProducts = async (req, res) => {
  const { productId } = req.body;
  
  try {
    const deletedProduct = await deleteProductsService(productId);
    return res
      .status(200)
      .json({ message: "Products deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const generateUpdateStockExcel = async (req,res) => {
  try {
    const { excelBuffer, fileName } = await generateUpdateStockExcelService(  );

        // Set response headers to prompt file download
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Send the Excel file buffer as the response
        res.send(excelBuffer);
  } catch (error) {
    return res.status(500).json({message : error.message})
  }
}

export const readUpdateStockExcel = async (req, res) => {
  try {
    console.log(req.file)  
    if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
      }
      
      // Call the service to read and process the Excel file
      const data = await readExcelFile(req.file.path);
      res.status(200).json({ data });
  } catch (error) {
      console.error('Error in uploadAndReadExcel:', error);
      res.status(500).json({ message: 'Failed to process file' });
  }
};