import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

const ENTER_KEY = 13;

class TodoEntry extends React.Component {
	render() {
		return (
            <input
                ref={input => { this._newField = input; }}
                className="new-todo"
                placeholder="Co trzeba zrobić?"
                onKeyDown={this.handleNewTodoKeyDown}
                autoFocus={true}
            />);
	}

	handleNewTodoKeyDown = event => {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

        const node = ReactDOM.findDOMNode(this._newField);
        const value = node.value.trim();
        
		if (value) {
			this.props.todoStore.addTodo(value);
			node.value = '';
		}
	};
}

TodoEntry.propTypes = {
	todoStore: PropTypes.object.isRequired
};

export default observer(TodoEntry);
