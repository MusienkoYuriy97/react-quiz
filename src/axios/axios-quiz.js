import axios from "axios";

export default axios.create({
    baseURL: 'https://react-quiz-20d1d-default-rtdb.firebaseio.com/'
})