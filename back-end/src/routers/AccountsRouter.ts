import { Router } from 'express';
import AccountsController from '../controllers/AccountsController';
import auth from '../middlewares/auth';

const router = Router();
const accountsController = new AccountsController();

router.get('/:id', auth, accountsController.getUserAccount);

export default router;
