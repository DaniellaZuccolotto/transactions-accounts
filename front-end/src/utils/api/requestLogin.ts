import axios from 'axios';
import { ILogin } from '../../interfaces/ILogin';

const createUser = async (user: ILogin) => {
  try {
    const URL = 'http://localhost:3001/login';
    const response = await axios.post(URL, user);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export default createUser;