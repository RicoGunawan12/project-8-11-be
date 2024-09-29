import { registerUserService, getUsersService, loginUserService, getUserByIdService } from '../services/user.service.js';


export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (username.length < 5) {
    return res.status(400).json({ message: 'Username length must be more than 4' });
  }
  else if (email.length < 1) {
    return res.status(400).json({ message: 'Email must be filled' })
  }
  else if (password.length < 1) {
    return res.status(400).json({ password: 'Password must be filled' })
  }
  
  try {
    const user = await registerUserService(username, email, password);
    return res.status(201).json({ message: 'User registered successfully', user: user.username });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  const users = await getUsersService();
  return res.status(200).json(users)
}

export const getUserById = async (req, res) => {
  const user = await getUserByIdService(req.params.id);
  return res.status(200).json(user)
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
