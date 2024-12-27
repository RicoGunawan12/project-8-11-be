import { registerUserService, getUsersService, loginUserService, getUserByIdService } from '../services/user.service.js';


export const registerUser = async (req, res) => {
  const { username, email, password, phone } = req.body;
  const phoneRegex = /^\+62\d+$/;

  if (username.length < 5) {
    return res.status(400).json({ message: 'Username length must be more than 4' });
  }
  else if (email.length < 1) {
    return res.status(400).json({ message: 'Email must be filled' })
  }
  else if (password.length < 1) {
    return res.status(400).json({ password: 'Password must be filled' })
  }
  else if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'Phone must start with +62' });
  }
  
  try {
    const user = await registerUserService(username, email, password, phone);
    return res.status(201).json({ message: 'User registered successfully', user: user.username });
  } catch (error) {
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

  console.log(userId)
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
    return res.status(400).json({ message: 'Email must be filled' });
  }
  else if (password.length < 1) {
    return res.status(400).json({ message: 'Password must be filled' });
  }

  try {
    const token = await loginUserService(email, password);
    return res.status(200).json({ message: 'Login success!', token: token })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}






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
