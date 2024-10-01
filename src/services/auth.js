import axios from 'axios';

const API_URL = 'http://localhost:3000';

function signIn(credentials) {
  return axios.post(`${API_URL}/sign-in`, credentials);
}

function signUp(userData) {
  return axios.post(`${API_URL}/sign-up`, userData);
}

function getUser(userId, token) {
  return axios.get(`${API_URL}/user/${userId}`, 
    { 
        headers: {'Authorization': `Bearer ${token}`}
    }
  );
}

export { signIn, signUp, getUser };