import { hashPassword, matchPassword } from '../utils/utility.js';
import jwt from 'jsonwebtoken'
import { UserModel } from '../association/association.js';
import { createCart } from './cart.service.js';
import { createCustomerXendit } from '../integration/xendit.integration.js';
import { Op } from 'sequelize';


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

export const registerUserService = async (fullName, email, password, phone) => {
  const existingUser = await UserModel.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const existingUserPhone = await UserModel.findOne({ where: { phone } });
  if (existingUserPhone) {
    throw new Error('Phone number already used');
  }

  // const hashedPassword = await hashPassword(password);
  const user = await UserModel.create({ fullName, email, password: password, role: 'user', phone });
  const cart = await createCart(user.userId);

  // const customer = await createCustomerXendit(user.userId, fullName, email, phone);
 
  // await UserModel.update(
  //   { customerId: customer.id },
  //   { where: { userId: user.userId }}
  // )
  
  return {user, cart};
};

export const registerAdminService = async (fullName, email, password, phone) => {
  const existingUser = await UserModel.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  // const hashedPassword = await hashPassword(password);
  const user = await UserModel.create({ fullName, email, password: password, role: 'admin', phone });
  // const cart = await createCart(user.userId);
  
  // const customer = await createCustomerXendit(user.userId, fullName, email, phone);
 
  // await UserModel.update(
  //   { customerId: customer.id },
  //   { where: { userId: user.userId }}
  // )
  
  return user;
};

export const migrateAdminService = async () => {
  const existingUser = await UserModel.findOne({ where: { email: "admin@gmail.com" } });
  if (!existingUser) {
    registerAdminService("admin", "admin@gmail.com", "admin", "-")  
  }
}

export const loginUserService = async (email, password) => {
  const normalizedEmailOrPhone = email.startsWith('0') 
  ? '+62' + email.slice(1) 
  : email;
  const existingUser = await UserModel.findOne({
    where: {
      [Op.or]: [{ email }, { phone: normalizedEmailOrPhone }],
      status: "active",
    },
  });
  if (!existingUser) {
    throw new Error('User not found!');
  }
  
  
  if (existingUser.role !== "user" ) {
    throw new Error('Invalid credential!');
  }
  
  const isMatch = await matchPassword(password, existingUser.password);
  if (!isMatch) {
    throw new Error('Wrong credential!');
  }
  
  const token = jwt.sign({ userId: existingUser.dataValues.userId }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRY });
  
  return token;
}

export const loginAdminService = async (email, password) => {
  const existingUser = await UserModel.findOne({ where: { email, status: "active" } });
  if (!existingUser) {
    throw new Error('User not found!');
  }

  if (existingUser.role !== "admin") {
    throw new Error('Invalid credential!');
  }

 
 
  
  const isMatch = await matchPassword(password, existingUser.password);
  if (!isMatch) {
    throw new Error('Wrong credential!');
  }
  
  const token = jwt.sign({ userId: existingUser.dataValues.userId }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRY });
  
  return token;
}

export const activateUserService = async (userId) => {
  const updatedUser = await UserModel.update({ status: "active" } , { where: { userId } });

  if (updatedUser[0] == 0) {
    throw new Error("Product variant not found!");
  }

  return updatedUser;
}

export const deactivateUserService = async (userId) => {
  const updatedUser = await UserModel.update({ status: "inactive" } , { where: { userId } });

  if (updatedUser[0] == 0) {
    throw new Error("Product variant not found!");
  }
  
  return updatedUser;
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
