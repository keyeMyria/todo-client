import { observable, computed, action, decorate } from 'mobx';
import axios from 'axios';
import TodoModel from '@/models/TodoModel';

class TodoStore {

    todos = [];

    get activeTodoCount () {
        return this.todos.reduce(
			(sum, todo) => sum + (todo.completed ? 0 : 1),
			0
		);
    }
    
    get completedCount () {
		return this.todos.length - this.activeTodoCount;
	}
    
    _setTodos = plainTodos => {
        this.todos = plainTodos.map(item => TodoModel.fromJS(this, item));
    }

    _addTodo = todo => {
        this.todos.push(todo);
    }

    loadTodos = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get('/api/todos');
                this._setTodos(data.todos);
                resolve(data.todos)
            } catch (e) {
                reject(e);
            }
        });
    }

    addTodo = text => {
        // https://github.com/babel/babel/issues/6806
        this._text = text;

        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.post('/api/todos', { text: this._text });
                const { _id:id, text, createdAt, completed } = data;
                this._addTodo(new TodoModel(this, id, text, createdAt, completed));
                this._text = null;
                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }

    toJS () {
		return this.todos.map(todo => todo.toJS());
	}
}

decorate(TodoStore, {
    todos: observable,
    _setTodos: action,
    _addTodo: action,
    activeTodoCount: computed,
    completedCount: computed
});

export default new TodoStore();
