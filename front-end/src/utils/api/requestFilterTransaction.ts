import axios from 'axios';

const filterTransactions = async (search: string, type: string, token: string) => {
  console.log(search);
  
  const query = `search=${search}&type=${type}`; 
  try { 
    const URL = `http://localhost:3001/transactions/find?${query}`;
    const response = await axios.get(
      URL,
      {
      headers: {
        Authorization: token,
      }
    },
    );    
    return response.data;
  } catch (error: any) {  
    return error.response;
  }
};

export default filterTransactions;