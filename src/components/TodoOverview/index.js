import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { ACTIVE_TODOS, COMPLETED_TODOS } from '@/constants';
import TodoItem from '@/components/TodoItem';

class TodoOverview extends Component {

    getVisibleTodos = () => {
        const { todoStore, viewStore } = this.props;
        return todoStore.todos.filter(todo => {
			switch (viewStore.todoFilter) {
				case ACTIVE_TODOS:
					return !todo.completed;
				case COMPLETED_TODOS:
					return todo.completed;
				default:
					return true;
			}
		});
    }

    render() {
		const { todoStore, viewStore } = this.props;
        
        if (!todoStore.todos || todoStore.todos.length === 0)
            return null;

        return (
            <section className="main">
                <ul className="todo-list">
                    {this.getVisibleTodos()
                        .sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)))
                        .map(todo =>
                        (<TodoItem
                            key={todo.id}
                            todo={todo}
                            viewStore={viewStore}
                        />))
                    }
                </ul>
            </section>
        );
    }
}

TodoOverview.propTypes = {
	viewStore: PropTypes.object.isRequired,
	todoStore: PropTypes.object.isRequired
}

export default observer(TodoOverview);
