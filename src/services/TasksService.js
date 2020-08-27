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
}