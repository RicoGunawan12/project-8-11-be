import { registerUserService, getUsersService } from '../services/userService.js';


export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (username.length < 5) {
    res.status(400).json({ message: 'Username length must be more than 4' });
  }
  else if (email.length < 1) {
    res.status(400).json({ message: 'Email must be filled' })
  }
  else if (password.length < 1) {
    res.status(400).json({ password: 'Password must be filled' })
  }
  
  try {
    const user = await registerUserService(username, email, password);
    res.status(201).json({ message: 'User registered successfully', user: user.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  const users = await getUsersService();
  res.status(200).json(users)
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (email.length < 1) {
    res.status(400).json({ message: 'Email must be filled' });
  }
  else if (password.length < 1) {
    res.status(400).json({ password: 'Password must be filled' });
  }

  try {
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}






// Register User with Raw SQL
// export const registerUserRaw = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     await registerUserRawService(username, email, password);
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
