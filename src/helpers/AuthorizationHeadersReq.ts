import axios from "axios";
let sendHeadersAuthorization = async (token: string, route: string):Promise<boolean> => {
let swapState = false
  let config = {
  method: 'get',
  maxBodyLength: 5,
  url: `http://localhost:4000/${route}`,
  headers: { 
    'Authorization': `Bearer ${token}`
  }
};

await axios.request(config)
.then((response) => {
  response.data
  swapState = true
})
.catch((error) => {
  console.log(error);
});
return swapState
}

export default sendHeadersAuthorization;
