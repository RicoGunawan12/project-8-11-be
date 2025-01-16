import XLSX from "xlsx";
import fs from "fs/promises";

export const generateExcel = async (columns) => {
  try {
    if (!Array.isArray(columns) || columns.length === 0) {
      throw new Error("Columns should be a non-empty array.");
    }

    // Prepare data with the specified columns
    const data = [columns];
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    // Define the filename
    const fileName = "generated_file.xlsx";

    return { excelBuffer, fileName };
  } catch (error) {
    console.error("Error generating Excel file:", error);
    throw error;
  }
};

export const readExcelFile = async (filePath) => {
  try {
    // Read the uploaded Excel file
    console.log(filePath);
    const workbook = XLSX.readFile(filePath);

    // Get the first sheet name
    const sheetName = workbook.SheetNames[0];

    // Parse the sheet into JSON
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    return data; // Return the processed data
  } catch (error) {
    console.error("Error in readExcelFile:", error);
    throw new Error("Failed to read Excel file");
  }
};
