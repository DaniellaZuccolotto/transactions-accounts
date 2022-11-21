import axios from 'axios';

const getUserAccount = async (id: string, token: string) => {
  try {
    console.log(id);
    
    const URL = `http://localhost:3001/account/${id}`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: token,
      }
    });
    return response.data;
  } catch (error: any) {  
    return error.response;
  }
};

export default getUserAccount;