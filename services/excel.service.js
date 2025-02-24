import XLSX from "xlsx";
import fs from "fs/promises";

export const generateExcel = async (columns) => {
  try {
    if (!Array.isArray(columns) || columns.length === 0) {
      throw new Error("Columns should be a non-empty array.");
    }
    const data = [columns];
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });
    const fileName = "update_stock_template.xlsx";

    return { excelBuffer, fileName };
  } catch (error) {
    console.error("Error generating Excel file:", error);
    throw error;
  }
};

export const readExcelFile = async (filePath, columns) => {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const rawData = XLSX.utils.sheet_to_json(worksheet);
  
  const transformedRow = new Array();
  rawData.forEach(row => {
    const rowKeys = Object.keys(row);
    const newArr = new Array()
    columns.forEach((column, index) => {
      newArr.push({ property : column.name , value: row[rowKeys[index]]?.toString() || '' });
    });
    
    transformedRow.push(newArr)
  });

  return transformedRow; 
};
