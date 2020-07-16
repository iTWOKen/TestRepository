import axios from 'axios';
axios.defaults.baseURL = "";
axios.interceptors.request.use((config)=>{
    // do common config for per request

    return config;
},error=>{
    // catch the error
    console.log('request error ',error);
});
axios.interceptors.response.use(res=>{
   // do common handler for per response
   return res;
},error=>{
    console.log('response error ',error);
});

export async function test(params) {
   return await axios.get('/api/test',{
        data:{params}
    });
}