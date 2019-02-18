import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-course-burger-buil-46ef5.firebaseio.com/'
});

export default instance;