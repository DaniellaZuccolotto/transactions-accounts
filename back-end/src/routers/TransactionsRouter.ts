import { Router } from 'express';
import TransactionsController from '../controllers/TransactionsController';
// import auth from '../middlewares/auth';

const router = Router();
const transactionsController = new TransactionsController();

router.post('/', transactionsController.createTransaction);

export default router;
