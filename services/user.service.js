import { hashPassword, matchPassword } from '../utils/utility.js';
import jwt from 'jsonwebtoken'
import { UserModel } from '../association/association.js';


export const getUsersService = async () => {
  const users = await UserModel.findAll();
  return users;
}

export const getUserByIdService = async (userId) => {
  const user = await UserModel.findOne({ where: { userId }});
  if (!user) {
    throw new Error('User not found!');
  }

  return user;
}

export const registerUserService = async (username, email, password) => {
  const existingUser = await UserModel.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // const hashedPassword = await hashPassword(password);
  const user = await UserModel.create({ username, email, password: password, role: 'user' });
  
  return user;
};

export const loginUserService = async (email, password) => {
  const existingUser = await UserModel.findOne({ where: { email } });
  if (!existingUser) {
    throw new Error('User not found!');
  }

  const isMatch = await matchPassword(password, existingUser.password);
  if (!isMatch) {
    throw new Error('Wrong credential!');
  }
  
  const token = jwt.sign({ userId: existingUser.dataValues.userId }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRY });
  
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
