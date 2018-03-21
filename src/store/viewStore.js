import { observable, action, decorate } from 'mobx';
import { ALL_TODOS } from '@/constants';

class ViewStore {
    todoBeingEdited = null;
    todoFilter = ALL_TODOS;
    setFilter = todoFilter => {
        this.todoFilter = todoFilter;
    }
}

decorate(ViewStore, {
    todoBeingEdited: observable,
    todoFilter: observable,
    setFilter: action
});

export default new ViewStore();
