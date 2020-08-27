import axios from "axios";

export default class UsersService {

    api = {
        url: "http://localhost:4000/users"
    };

    getAllUsers() {
        return axios.get(`${this.api.url}/getAll`)
    };

    addUsers(username) {
        return axios.post(`${this.api.url}/add`, {
            username: username,
        });
    }
}