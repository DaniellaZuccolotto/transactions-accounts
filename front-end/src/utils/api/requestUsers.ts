import axios from 'axios';

const getUsers = async () => {
  try {
    const URL = 'http://localhost:3001/users';
    const response = await axios.get(URL);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export default getUsers;