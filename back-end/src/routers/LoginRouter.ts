import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import loginMiddleware from '../middlewares/loginMiddleware';

const router = Router();
const loginController = new LoginController();

router.post('/login', loginController.login);
router.post('/register', loginMiddleware, loginController.createUser);

export default router;
