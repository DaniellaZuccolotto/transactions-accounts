import { Router } from 'express';
import TransactionsController from '../controllers/TransactionsController';
import auth from '../middlewares/auth';

const router = Router();
const transactionsController = new TransactionsController();

router.post('/', auth, transactionsController.createTransaction);
router.get('/find', auth, transactionsController.findTransactions);
router.get('/:id', auth, transactionsController.findTransactionsUser);

export default router;
