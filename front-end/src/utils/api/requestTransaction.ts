import axios from 'axios';
import { ITransaction } from '../../interfaces/ITransaction';

const createTransaction = async (body: ITransaction, token: string) => {
  try { 
    const URL = 'http://localhost:3001/transactions';
    const response = await axios.post(
      URL,
      body,
      {
      headers: {
        Authorization: token,
      }
    });
    return response.data;
  } catch (error: any) {  
    return error.response;
  }
};

export default createTransaction;