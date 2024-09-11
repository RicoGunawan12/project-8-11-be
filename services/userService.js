import User from '../models/User.js';
import sequelize from '../config/database.js';
import { hashPassword, matchPassword } from '../utils/utility.js';
import jwt from 'jsonwebtoken'


export const getUsersService = async () => {
  const users = await User.findAll();
  return users;
}

export const registerUserService = async (username, email, password) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await hashPassword(password);
  const user = await User.create({ username, email, password: hashedPassword, role: 'user' });
  
  return user;
};

export const loginUserService = async (email, password) => {
  const existingUser = await User.findOne({ where: { email } });
  if (!existingUser) {
    throw new Error('User not found!');
  }

  const isMatch = await matchPassword(password, existingUser.password);
  if (!isMatch) {
    throw new Error('Wrong credential!');
  }

  const token = jwt.sign({ userId: existingUser.id }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRY });
  return token;
}




// export const registerUserRawService = async (username, email, password) => {
//   const [existingUser] = await sequelize.query('SELECT * FROM Users WHERE email = ?', {
//     replacements: [email],
//     type: sequelize.QueryTypes.SELECT,
//   });

//   if (existingUser) {
//     throw new Error('User already exists');
//   }
//   const hashedPassword = await hashPassword(password);

//   await sequelize.query('INSERT INTO Users (username, email, password) VALUES (?, ?, ?)', {
//     replacements: [username, email, hashedPassword],
//   });
// };
