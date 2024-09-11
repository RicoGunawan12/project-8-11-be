import User from '../models/User.js';
import sequelize from '../config/database.js';
import { hashPassword } from '../utils/utility.js';


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

export const loginUserService = async () => {
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
