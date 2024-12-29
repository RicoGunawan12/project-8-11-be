import express from 'express';
import { registerUser, getUsers, loginUser, getUserById, loginAdmin, storeUser } from '../controllers/user.controller.js';
import { idParamsValidator } from '../validator/general/getByIdParams.validator.js';
import { validateSchema } from '../validator/validate.js';
import { generalValidator } from '../validator/general/general.validator.js';
import { userSchema } from '../schema/model/user.schema.js';
import { adminMiddleware, userMiddleware } from '../middleware/auth.middleware.js';
import { loginSchema } from '../schema/auth/login.schema.js';
import { userStoreSchema } from '../schema/user/userStore.schema.js';

const userRoute = express.Router();

userRoute.get('/', getUsers);
// userRoute.get('/:id',idParamsValidator,validateSchema,getUserById);
userRoute.get('/data', userMiddleware, getUserById)

userRoute.post('/register',generalValidator(userSchema),validateSchema, registerUser);
userRoute.post('/login',generalValidator(loginSchema),validateSchema, loginUser);
userRoute.post('/login/admin', loginAdmin);

userRoute.post('/', adminMiddleware, generalValidator(userStoreSchema), validateSchema, storeUser);

export default userRoute;
