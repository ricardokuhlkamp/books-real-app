import axios from "axios";
// import { verifyToken } from "../../../backend/utils/auth";

export const axiosLoginWithAuthorization = async (email, password) => {
  try {
    const bodyData = {
      email,
      password,
    };
    const token = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/login`, bodyData);
    // if (!response.ok) {
    //   throw new Error('Erro na requisição');
    // }
    localStorage.setItem('user',JSON.stringify(token.data))
    return token.status;
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
};

export const axiosCreateUser = async (username, email, password) => {
  try {
    const bodyData = {
      username,
      email,
      password,
    };

    const token = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/signin`, bodyData);
    // console.log('Response: ', response)
    // if (!response.ok) {
    //   throw new Error('Erro na requisição');
    // }    
    localStorage.setItem('user',JSON.stringify(token.data));
    return token.status;
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
};

export const axiosGetAllBooks = async () => {  
  const token =JSON.parse(localStorage.getItem('user'));
  const headers = {
    Authorization: token,
  };
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/book/books`, { headers });
  return response;  
};

export const axiosCreateBook = async (bodyData) => {  
  const token =JSON.parse(localStorage.getItem('user'));
  const headers = {
    Authorization: token,
  };
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/book/savebook`, bodyData, { headers });
  return response;
};

export const axiosGetBookById = async (id) => {
  const token =JSON.parse(localStorage.getItem('user'));
  const headers = {
    Authorization: token,
  };
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/book/book/${id}`, { headers });
  return response;
};

export const axiosUpdateBook = async (bodyData, id) => {
  const token =JSON.parse(localStorage.getItem('user'));
  const headers = {
    Authorization: token,
  };
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/book/updatebook/${id}`, bodyData, { headers });
  return response;
};

export const axiosDeleteBook = async (id) => {
  const token =JSON.parse(localStorage.getItem('user'));
  const headers = {
    Authorization: token,
  };
  const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/book/deletebook/${id}`, { headers });
  return response;
};

export const axiosGetBookByTitle = async (title) => {
  const token = JSON.parse(localStorage.getItem('user'));
  const headers = {
    Authorization: token,
  };
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/book/title?title=${title}`, { headers });
    return response;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

export const axiosGetBooksByAuthor = async (author) => {
  const token = JSON.parse(localStorage.getItem('user'));
  const headers = {
    Authorization: token,
  };
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/book/author?author=${author}`, { headers });
    return response;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

export const axiosGetBooksByGenre = async (genre) => {
  const token = JSON.parse(localStorage.getItem('user'));
  const headers = {
    Authorization: token,
  };
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/book/genre?genre=${genre}`, { headers });
    return response;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
