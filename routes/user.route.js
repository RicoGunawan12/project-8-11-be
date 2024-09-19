import express from 'express';
import { registerUser, getUsers, loginUser } from '../controllers/user.controller.js';

const userRoute = express.Router();

userRoute.get('/', getUsers);

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);

export default userRoute;
