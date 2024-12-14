import multer from "multer";
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
export const UPLOAD_FOLDER = process.env.FOLDER_PATH || 'assets/';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, "../" + UPLOAD_FOLDER + "product/" + req.body.productName);

        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${req.body.productName}.png`);
    }
});

const storageBlog = multer.diskStorage({
    destination: async function (req, file, cb) {
        const uploadPath = path.join(__dirname, "../" + UPLOAD_FOLDER + 'blog');

        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${req.body.postTitle}.png`);
    }
});

export const upload = multer({ storage: storage });
export const uploadBlog = multer({ storage: storageBlog });


export const deleteDirectory = (productName) => {
  const dirPath = path.join(__dirname, "../", UPLOAD_FOLDER + productName);

  console.log(dirPath);
  

  fs.rm(dirPath, { recursive: true, force: true }, (err) => {
      if (err) {
          console.error("Error deleting directory:", err);
          return { success: false, message: "Directory not found or error deleting directory" };
      }
      console.log("Directory deleted successfully");
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
        console.log("File deleted successfully");
        resolve({ success: true, message: "File deleted successfully" });
      }
    });
  });
};