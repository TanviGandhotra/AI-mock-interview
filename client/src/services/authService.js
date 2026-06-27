import axios from "axios";

const API = "http://localhost:5000/api/auth";


// SIGNUP
export const signupUser = async (
  userData
) => {

  const response = await axios.post(
    `${API}/signup`,
    userData
  );

  return response.data;

};


// LOGIN
export const loginUser = async (
  userData
) => {

  const response = await axios.post(
    `${API}/login`,
    userData
  );

  return response.data;

};