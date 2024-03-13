import axios from "axios";

export const loginCheck = (values) => {
  return axios.post(`/api/login`, values)
    .then((res) => {
      return res.data; // Return the response data
    })
    .catch((error) => {
      console.error('LoginCheck::error', error);
      throw error; // Throw the error for the caller to handle
    });
};
