import axios from 'axios';
import { dataHandler } from './dataHandler';

//This is a custom axios function that accepts method,url,
//reqData which is the data to be sent to server
//reqType which is the type of request being made so we can handle it in data controler
//and return the response data< not very useful in our app but some features may require it

//creating an axios instance
const server = 'http://localhost:3000';
const instance = axios.create({
  baseURL: `${server}`,
  timeout: 10000,
  withCredentials: true,
  maxRedirects: 5,
  headers: {
    'Content-Type': 'application/json',
  },
});

//FLOW-> makerequest fnCall -> axios request send -> response received -> dataHandler called -> data handled -> response data returned ->returned to orignal fnCall
export const makeRequest = async ({
  method,
  url,
  reqData = {},
  reqType = '',
}) => {
  try {
    //sending request to server
    const { data } = await instance[method](url, reqData);
    //handling the response data
    const { resData } = dataHandler({ data, reqType });
    //returning the response data
    return resData;
  } catch (error) {
    if (error?.status === 401) {
      return (window.location.href = '/logout');
    } else {
      encodedError = encodeURIComponent(error.message);
      encodedMessage = encodeURIComponent('An error occured');
      return (window.location.href = `http://localhost:5173/error?message=${encodedMessage}&error=${encodedError}`);
    }
  }
};

export default makeRequest;
