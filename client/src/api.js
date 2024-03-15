
import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

export const loginCheck = async (values) => {
  try {
    const res = await instance.post('/login', values);
    return res.data;
  } catch (error) {
    console.error('LoginCheck::error', error);
    throw error;
  }
};

export const registerUser = async (values) => {
    console.log({values})
    try {
    const res = await instance.post(`/register`, values);
    return res.data;
  } catch (error) {
    console.error('Register::error', error);
    throw error;
  }
  };

  export const getUsers = async (values) => {
    try {
    const res = await instance.get(`/getUsers`, values);
    return res.data;
  } catch (error) {
    console.error('GetUsers::error', error);
    throw error;
  }
  };
