import axios from "axios";

export default class TasksService {

    api = {
        url: "http://localhost:4000/tasks"
    };

    getAllTasks() {
        return axios.get(`${this.api.url}/getAll`)
    };

    addTasks(task) {
        const { title, content, author, status } = task;

        return axios.post(`${this.api.url}/add`, {
            title, content, author, status
        });
    }

    taskGetByid(id){
        return axios.get(`${this.api.url}/${id}`)
    }

    editsTasks(task, id) {
        return axios.put(`${this.state.url}/${id}`, task);
    }
}