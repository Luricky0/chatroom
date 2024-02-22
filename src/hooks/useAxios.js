import axios from "axios";
const api=axios.create(
    {
        baseURL:'http://localhost:4998'
    }
)
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     }, (error) => {
//         if (error.response.status === 401) {
//             const originalReq = error.config
//             if(!originalReq._retry){
//                 originalReq._retry = true
//                 try{
//                     const refreshToken = localStorage.getItem('refreshToken')
//                     axios.post('http://localhost:4998/refresh',{refreshToken})
//                         .then((response)=>{
//                             const token = response.data.token
//                             localStorage.setItem('token',token)
//                             originalReq.headers['Authorization']=`Bearer ${token}`
//                         })
//                 }catch(error){
//                     //待补充
//                     localStorage.setItem("id",null)
//                 }
//             }else{
//                 //待补充
//                 localStorage.setItem("id",null)
//             }
//
//         }
//         return Promise.reject(error);
//     }
// );

export default function useAxios(){
    return {api}
}