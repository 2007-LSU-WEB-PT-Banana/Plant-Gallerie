//import axios from 'axios';

export const BASE_URL = '/api';

export const fetchAPI = async (url, method="GET", sendData=null) => {
  const fetchOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    }
  };

  if (sendData) {
    fetchOptions.body = JSON.stringify(sendData);
  }
  
  console.log("this is what we are sending in the fetch", fetchOptions);
  //console.log("this is the initial response:", response);

  const response = await fetch(url, fetchOptions);
  const data = await response.json();
  
  return data;
}

// export async function getSomething() {
//   try {
//     const { data } = await axios.get('/api');
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }



