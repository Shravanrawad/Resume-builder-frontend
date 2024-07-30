import axios from 'axios';

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL+'/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
});

const createNewResume = (data) => axiosClient.post('/user-resumes', data);
const GetUserResumes = (userEmail) => axiosClient.get('/user-resumes?filters[UserEmail] [$eq]='+userEmail);
const Updateresume = (id, data) => axiosClient.put(`/user-resumes/${id}`, data);
// const Updateresume = (id, data) => axiosClient.put('/user-resumes/' + id, { data });
const Getresumebyid = (id) => axiosClient.get('/user-resumes/'+id+'?populate=*');
const Deleteresume = (id) => axiosClient.delete('/user-resumes/'+id)

export { createNewResume , GetUserResumes, Updateresume, Getresumebyid, Deleteresume}; 
