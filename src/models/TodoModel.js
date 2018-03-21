import { observable, decorate } from 'mobx';
import axios from 'axios';

class TodoModel {
	store;
    id;
    text;
    createdAt;
    completed;

	constructor (store, id, text, createdAt, completed = false) {
		this.store = store;
		this.id = id;
        this.text = text;
        this.createdAt = createdAt;
        this.completed = completed;
	}

	toggle () {
        const completed = !this.completed;
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.patch(`/api/todos/${this.id}`, { completed });
                this.completed = completed;
                resolve(response);
            } catch (e) {
                reject(e);
            }
        });
	}

	destroy () {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.delete(`/api/todos/${this.id}`);
                this.store.todos.remove(this);
                resolve(response);
            } catch (e) {
                reject(e);
            }
        });
	}

	setText (text) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.patch(`/api/todos/${this.id}`, { text });
                this.text = text;
                resolve(data.todo);
            } catch (e) {
                reject(e);
            }
        });
	}

	toJS () {
		return {
			id: this.id,
            text: this.text,
            createdAt: this.createdAt,
            completed: this.completed
		};
	}

	static fromJS (store, object) {
		return new TodoModel(store, object._id, object.text, object.createdAt, object.completed);
	}
}

decorate(TodoModel, {
    text: observable,
    createdAt: observable,
    completed: observable
});

export default TodoModel;