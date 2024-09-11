import express from 'express';
import { registerUser, getUsers, loginUser } from '../controllers/userController.js';

const userRoute = express.Router();

userRoute.get('/', getUsers);

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser)

export default userRoute;
