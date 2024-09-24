import express from 'express';
import { registerUser, getUsers, loginUser, getUserById } from '../controllers/user.controller.js';

const userRoute = express.Router();

userRoute.get('/', getUsers);
userRoute.get('/:id', getUserById);

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);

export default userRoute;
