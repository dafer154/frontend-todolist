import axios from "axios";

export default class TasksService {

    api = {
        // url: "http://localhost:4000/tasks"
        url: "https://condor-backend-todolist.herokuapp.com/tasks"
    };

    getAllTasks() {
        return axios.get(`${this.api.url}/`)
    };

    addTasks(task) {
        const { title, content, author, status } = task;

        return axios.post(`${this.api.url}/add`, {
            title, content, author, status
        });
    }

    taskGetByid(id) {
        return axios.get(`${this.api.url}/${id}`)
    }

    editsTasks(task, id) {
        return axios.put(`${this.api.url}/edit/${id}`, task);
    }

    deleteTask(id) {
        return axios.delete(`${this.api.url}/delete/${id}`);
    }

    unassignUser(id) {
        return axios.put(`${this.api.url}/unassign/${id}`)
    }

    searchTask(query, status) {
        return axios.post(`${this.api.url}/search`, { query: query, status: status })
    }

}