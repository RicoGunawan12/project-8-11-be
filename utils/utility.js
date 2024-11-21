import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

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