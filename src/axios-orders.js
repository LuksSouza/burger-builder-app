import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-app-my-burguer.firebaseio.com'
});

export default instance;