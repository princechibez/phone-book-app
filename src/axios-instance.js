import axios from "axios";

const instance = axios.create({
    baseURL: "https://phonebook-d5de1-default-rtdb.firebaseio.com/"
});

export default instance;