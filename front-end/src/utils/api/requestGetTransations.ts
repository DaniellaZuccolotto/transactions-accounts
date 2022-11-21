import axios from 'axios';

const getTransactions = async (id: string, token: string) => {
  try { 
    const URL = `http://localhost:3001/transactions/${id}`;
    const response = await axios.get(
      URL,
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

export default getTransactions;