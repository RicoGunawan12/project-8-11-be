import express from 'express';
import { registerUser, getUsers, loginUser, getUserById } from '../controllers/user.controller.js';
import { idParamsValidator } from '../validator/general/getByIdParams.validator.js';
import { validateSchema } from '../validator/validate.js';
import { generalValidator } from '../validator/general/general.validator.js';
import { userSchema } from '../schema/model/user.schema.js';
import { userMiddleware } from '../middleware/auth.middleware.js';

const userRoute = express.Router();

userRoute.get('/', getUsers);
// userRoute.get('/:id',idParamsValidator,validateSchema,getUserById);
userRoute.get('/data', userMiddleware, getUserById)

userRoute.post('/register',generalValidator(userSchema),validateSchema, registerUser);
userRoute.post('/login', loginUser);

export default userRoute;
