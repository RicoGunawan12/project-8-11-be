import sharp from "sharp"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Convert given image to WebP format.
 * 
 * @param {string} dirpath Which location in asset folder
 * @param {string} image 
 * @returns 
 */
export const convertImageToWebp = async (dirpath, image, filename) => {
    const newFile = path.resolve(path.join(__dirname, dirpath),filename);
    await sharp(image.path).webp().toFile(newFile);

    // fs.unlinkSync(image.path);
    return {
        filepath: newFile,
        filename: filename
    };
}

export const processImage = async (req, res, next) => {
    try {
      if (!req.file && !req.files) return next();
  
      const processFile = async (file) => {
        const inputPath = file.path;
        const ext = path.extname(inputPath).toLowerCase();
        
        // If the file is already .webp, don't process it
        if (ext === ".webp") {
          console.log("Skipping already WebP file:", inputPath);
          return;
        }
  
        // Create the output path with a .webp extension
        const outputPath = path.join(
          path.dirname(inputPath),
          `${path.basename(inputPath, ext)}.webp`
        );
  
        console.log("Converting:", inputPath, "->", outputPath);
  
        // Convert to WebP
        await sharp(inputPath)
          .webp()
          .toFile(outputPath);
  
        // Delete the original file after conversion
        await fs.promises.unlink(inputPath);
      };
  
      if (req.files) {
        await Promise.all(Object.values(req.files).flat().map(processFile));
      } else if (req.file) {
        await processFile(req.file);
      }
  
      next();
    } catch (error) {
      console.error("Image processing error:", error);
      next(error);
    }
  };