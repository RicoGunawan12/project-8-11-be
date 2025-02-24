import jwt from 'jsonwebtoken';
import { registerUserService, getUsersService, loginUserService, getUserByIdService, loginAdminService, registerAdminService, activateUserService, deactivateUserService } from '../services/user.service.js';
import { sendEmailPostRegister } from '../services/email.service.js';


export const registerUser = async (req, res) => {
  const { fullName, email, password, confirmPassword, phoneNumber } = req.body;
  const phoneRegex = /^\+62\d+$/;

  if (email.length < 1) {
    return res.status(400).json({ path: 'email', message: 'Email must be filled' })
  }
  else if (password.length < 1) {
    return res.status(400).json({ path: 'password', message: 'Password must be filled' })
  }
  else if (password !== confirmPassword) {
    return res.status(400).json({ path: 'confirmPassword', password: 'Password and confirm password doesn\'t match' })
  }
  else if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({ path: 'phoneNumber', message: 'Phone must start with +62' });
  }
  
  try {
    await sendEmailPostRegister(email, fullName, "id");
    const user = await registerUserService(fullName, email, password, phoneNumber);
    return res.status(201).json({ message: 'User registered successfully', user: user.fullName });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await getUsersService();
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getUserById = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await getUserByIdService(userId);
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  if (email.length < 1) {
    return res.status(400).json({ path: 'email', message: 'Email must be filled' });
  }
  else if (password.length < 1) {
    return res.status(400).json({ path: 'password', message: 'Password must be filled' });
  }

  try {
    const token = await loginUserService(email, password);
    return res.status(200).json({ message: 'Login success!', token: token })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  
  if (email.length < 1) {
    return res.status(400).json({ message: 'Email must be filled' });
  }
  else if (password.length < 1) {
    return res.status(400).json({ message: 'Password must be filled' });
  }

  try {
    const token = await loginAdminService(email, password);
    return res.status(200).json({ message: 'Login success!', token: token })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const storeUser = async (req, res) => {
  const { role, fullName, email, phone, password, confirmPassword } = req.body;

  try {
    if (role === 'admin') {
      const user = await registerAdminService(fullName, email, password, phone);
      return res.status(201).json({ message: 'User registered successfully', user: user.fullName });
    } else if (role === 'user') {
      const user = await registerUserService(fullName, email, password, phone);
      return res.status(201).json({ message: 'User registered successfully', user: user.fullName });
    } else {
      return res.status(500).json({ message: 'Invalid request' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const activateUser = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await activateUserService(userId);
    return res.status(200).json({ message: 'User account is activated', user: user.fullName });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const deactivateUser = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await deactivateUserService(userId);
    return res.status(200).json({ message: 'User account is deactivated', user: user.fullName });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const getLoggedInUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const tokenType = req.headers.authorization?.split(" ")[0];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (tokenType === "Bearer") {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      const userId = decoded.userId;

      const user = await getUserByIdService(userId);

      if (!(user.role == "admin" || user.role == "user")) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      return res.status(200).json({ message: "User successfully fetched", user: {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status
      }});
    } catch (error) {
      if (error.name == "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      }
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};




// Register User with Raw SQL
// export const registerUserRaw = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     await registerUserRawService(username, email, password);
//     return res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
