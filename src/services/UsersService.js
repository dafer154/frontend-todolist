import axios from "axios";

export default class UsersService {

    api = {
        url: "https://condor-backend-todolist.herokuapp.com/users"
    };

    getAllUsers() {
        return axios.get(`${this.api.url}/getAll`)
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
        return axios.put(`${this.api.url}/${id}`, user);
    }

    deleteUser(id){
        return axios.delete(`${this.api.url}/${id}`);
    }

    searchUser(query){
        return axios.post(`${this.api.url}/search`, {query: query})
    }
}