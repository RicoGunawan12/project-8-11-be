import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const matchPassword = async (inputted, password) => {
  return await bcrypt.compare(inputted, password)
}

