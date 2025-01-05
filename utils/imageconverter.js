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

    fs.unlinkSync(image.path);
    return {
        filepath: newFile,
        filename: filename
    };
}