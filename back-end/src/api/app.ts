import * as express from 'express';
import * as cors from 'cors';
import error from '../middlewares/error';
import LoginRouter from '../routers/LoginRouter';
import AccountsRouter from '../routers/AccountsRouter';
import TransactionsRouter from '../routers/TransactionsRouter';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.config();

    this.app.use(LoginRouter);
    this.app.use('/account', AccountsRouter);
    this.app.use('/transactions', TransactionsRouter);
    this.app.use(error);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
