import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const matchPassword = async (inputted, password) => {
  return await bcrypt.compare(inputted, password)
}

export function formatDateToString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const isValidDate = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/; // Regular expression for YYYY-MM-DD
  if (!regex.test(date)) return false;

  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime()) && date === parsedDate.toISOString().split('T')[0];
};


export const generateReadableId = () => {
    const date = new Date();
    
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
    
    const randomId = uuidv4().replace(/-/g, "").slice(0, 6).toUpperCase();
    
    const readableId = `TYS/${formattedDate}/${randomId}`;
    
    return readableId;
};

export function isValidNumber(value) {
  return !isNaN(value) && value !== null && value !== '';
}