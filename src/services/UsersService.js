import axios from "axios";

export default class UsersService {

    api = {
        // url: "http://localhost:4000/tasks"
        url: "https://condor-backend-todolist.herokuapp.com/users"
    };

    getAllUsers() {
        return axios.get(`${this.api.url}/`)
    };

    addUsers(username) {
        return axios.post(`${this.api.url}/add`, {
            username: username.username,
        });
    }

    userGetByid(id) {
        return axios.get(`${this.api.url}/${id}`)
    }

    editUser(user, id) {
        return axios.put(`${this.api.url}/edit/${id}`, user);
    }

    deleteUser(id) {
        return axios.delete(`${this.api.url}/delete/${id}`);
    }

    searchUser(query) {
        return axios.post(`${this.api.url}/search`, { query: query })
    }
}