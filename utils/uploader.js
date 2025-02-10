import multer from "multer";
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { getPageService, getWhyContentService } from "../services/page.service.js";
import { isValidNumber } from "./utility.js";

import webp from "webp-converter"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
export const UPLOAD_FOLDER = process.env.FOLDER_PATH || 'assets/';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      const sanitizedProductName = req.body.productName.replace(/\//g, "");
      const uploadPath = path.join(__dirname, "../" + UPLOAD_FOLDER + "product/" + sanitizedProductName);

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      
      // Store the upload path in the request object for later use
      req.uploadPath = uploadPath;
      cb(null, uploadPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: async function (req, file, cb) {
    try {
      if (!req.timestamp) {
        req.timestamp = Date.now();
      }

      // Generate filename but always use .webp extension
      const filename = file.fieldname === "defaultImage"
        ? `${path.parse(file.originalname).name}`
        : `${req.timestamp}-${path.parse(file.originalname).name}`;

      // Store the full path for Sharp processing
      const fullPath = path.join(req.uploadPath, filename);
      req.currentFile = { path: fullPath, filename };

      cb(null, filename);
    } catch (error) {
      cb(error);
    }
  }
});

const storageBlog = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      const uploadPath = path.join(__dirname, "../" + UPLOAD_FOLDER + 'blog/' + req.body.postTitle);

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    } catch (error) {
      cb(error)
    }
  },
  filename: function (req, file, cb) {
    try {
      cb(null, `${Date.now()}-${req.body.postTitle}.png`);
    } catch (error) {
      cb(error)
    }
  }
});

const storageContact = multer.diskStorage({
  destination: async function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../" + UPLOAD_FOLDER + 'contact');

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    try {
      const uploadPath = path.join(__dirname, "../" + UPLOAD_FOLDER + 'contact/' + req.body.contact);
      if (fs.existsSync(uploadPath)) {
        fs.unlinkSync(uploadPath); // Deletes the file
      }
      cb(null, `${req.body.contact}.png`);
    } catch (error) {
      cb(error);
    }
  }
});

const storageBanner = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      const uploadPath = path.join(__dirname, "../" + UPLOAD_FOLDER + 'banner');

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    try {
      if (!req.timestamp) {
        req.timestamp = Date.now();
      }

      const fileName = `${req.timestamp}-${req.body.page}.webp`;

      const uploadPath = path.join(__dirname, "../" + UPLOAD_FOLDER + 'banner');
      const inputFilePath = path.join(uploadPath, file.originalname);
      const outputFilePath = path.join(uploadPath, fileName);

      cb(null, fileName);

      process.nextTick(() => {
        webp.cwebp(inputFilePath, outputFilePath, "-q 80")
          // .then(() => fs.unlinkSync(inputFilePath))
          .catch(err => console.error("WebP conversion error:", err));
      });

    } catch (error) {
      cb(error);
    }
  }
});

const storageCategory = multer.diskStorage({
  destination: async function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../" + UPLOAD_FOLDER + 'category');

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    try {
      const uploadPath = path.join(__dirname, "../" + UPLOAD_FOLDER + 'category/' + req.body.productCategoryName);
      if (fs.existsSync(uploadPath)) {
        fs.unlinkSync(uploadPath); // Deletes the file
      }
      cb(null, `${req.body.productCategoryName}.png`);
    } catch (error) {
      cb(error)
    }
  }
});

const storageBackground = multer.diskStorage({
  destination: async function (req, file, cb) {
    let uploadPath = '';
    if (file.fieldname === 'background') {
      uploadPath = path.join(__dirname, "../" + UPLOAD_FOLDER + 'background');
    }
    else if (file.fieldname === 'photo') {
      uploadPath = path.join(__dirname, "../" + UPLOAD_FOLDER + 'photo');
    }

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: async function (req, file, cb) {
 
    try {
      // Validate index from the request body
      // var { index } = req.body;
 
      if (!isValidNumber(req.body.index)) {
        return cb(new Error("Invalid index"));
      }


      let uploadPath = '';
      if (file.fieldname === 'background') {
        uploadPath = path.join(__dirname, "../" + UPLOAD_FOLDER + 'background');
      }
      else if (file.fieldname === 'photo') {
        uploadPath = path.join(__dirname, "../" + UPLOAD_FOLDER + 'photo');
      }
      const pages = await getPageService();
      const index = parseInt(req.body.index);
      const page = pages[0].contentJSONEng[index].page;
      const newFilename = `${page}${index + 1}.png`;
 

      // Check if a previous file exists and delete it
      const previousFilePath = path.join(uploadPath, newFilename);
      if (fs.existsSync(previousFilePath)) {
        fs.unlinkSync(previousFilePath); // Deletes the file
      }

      // Set the new filename
      cb(null, newFilename);
    } catch (error) {
 

      console.error("Error in filename function:", error);
      cb(error); // Handle any errors gracefully
    }
  }
});

const storageWhyPhoto = multer.diskStorage({
  destination: async function (req, file, cb) {
    let uploadPath = path.join(__dirname, "../" + UPLOAD_FOLDER + 'photo');

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: async function (req, file, cb) {
    try {
      // Validate index from the request body
      // var { index } = req.body;
 
      if (!isValidNumber(req.body.index)) {
        return cb(new Error("Invalid index"));
      }


      let uploadPath = path.join(__dirname, "../" + UPLOAD_FOLDER + 'photo');
      const index = parseInt(req.body.index);
      const newFilename = `About Page${index + 1}.png`;
      // Check if a previous file exists and delete it
      const previousFilePath = path.join(uploadPath, newFilename);
      if (fs.existsSync(previousFilePath)) {
        fs.unlinkSync(previousFilePath); // Deletes the file
      }

      // Set the new filename
      cb(null, newFilename);
    } catch (error) {
 

      console.error("Error in filename function:", error);
      cb(error); // Handle any errors gracefully
    }
  }
})

const storageCarousel = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      let uploadPath = '';

      if (file.fieldname === 'carouselImage') {
        uploadPath = path.join(__dirname, "../" + UPLOAD_FOLDER + 'carousel');
      } else if (file.fieldname === 'carouselImageMobile') {
        uploadPath = path.join(__dirname, "../" + UPLOAD_FOLDER + '/carousel/mobile');
      }

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      // Store the upload path in req for later use
      req.uploadPath = uploadPath;
      cb(null, uploadPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    try {
      if (!req.timestamp) {
        req.timestamp = Date.now();
      }

      const filename = file.fieldname === "carouselImage"
        ? `${path.parse(file.originalname).name}`
        : `${req.timestamp}-${path.parse(file.originalname).name}`;

      // Store full path for processing
      const fullPath = path.join(req.uploadPath, filename);
      req.currentFile = { path: fullPath, filename };

      cb(null, filename);
    } catch (error) {
      cb(error);
    }
  }
});


export const upload = multer({ storage: storage });
export const uploadBlog = multer({ storage: storageBlog });
export const uploadContact = multer({ storage: storageContact });
export const uploadBanner = multer({ storage: storageBanner });
export const uploadCategory = multer({ storage: storageCategory });
export const uploadBackground = multer({ storage: storageBackground });
export const uploadWhyPhoto = multer({ storage: storageWhyPhoto });
export const uploadCarousel = multer({ storage: storageCarousel });


export const deleteDirectory = (productName) => {
  const dirPath = path.join(__dirname, "../", UPLOAD_FOLDER + productName);

 


  fs.rm(dirPath, { recursive: true, force: true }, (err) => {
    if (err) {
      console.error("Error deleting directory:", err);
      return { success: false, message: "Directory not found or error deleting directory" };
    }
 
    return { success: true, message: "Directory deleted successfully" };
  });
};


export const deletePostImage = (postImage) => {
  const filePath = path.join(__dirname, postImage);

  return new Promise((resolve, reject) => {
    fs.rm(filePath, { force: true }, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        reject({ success: false, message: "File not found or error deleting file" });
      } else {
 
        resolve({ success: true, message: "File deleted successfully" });
      }
    });
  });
};