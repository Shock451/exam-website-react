import { Router } from "express";

import UserController from "../controllers/users";
import AuthMiddleware from "../middlewares/auth";


const router = Router();

router.get('/me', AuthMiddleware.authorize, UserController.getMyProfile);

// router.put('/me', AuthMiddleware.authorize, UserController.updateUserProfile);

router.get('/list', AuthMiddleware.authorize, AuthMiddleware.only_admins, UserController.getUserList);

router.post('/login', UserController.login);

router.post('/register', UserController.registerUser, UserController.login);

router.delete('/:id', AuthMiddleware.authorize, AuthMiddleware.only_admins, UserController.deleteUser);

export default router;