import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { extendObservable } from 'mobx';
import { expr } from 'mobx-utils';
import { observer } from 'mobx-react';
import classnames from 'classnames';

/*

https://mobx.js.org/refguide/extend-observable.html
ExtendObservable can be used to add observable properties
to the existing target objects.

https://mobx.js.org/refguide/expr.html
expr can be used to create temporarily computed values
inside computed values. Nesting computed values is useful
to create cheap computations to prevent expensive
computations to run.

*/

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

class TodoItem extends Component {

    constructor(props) {
        super(props);
        extendObservable(this, {
            editText: ''
        });
    }

    render() {
        const { viewStore, todo } = this.props;
        const isSelected = expr(() => viewStore.todoBeingEdited === todo);

        return (
            <li className={classnames({ 'completed': todo.completed, 'editing': isSelected })}>
                <div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={todo.completed}
						onChange={this.handleToggle}
					/>
					<label onDoubleClick={this.handleEdit}>
						{todo.text}
					</label>
				</div>
                <input
					ref={(input) => { this.editField = input; }}
					className="edit"
					value={this.editText}
					onBlur={this.handleSubmit}
                    onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
				/>
            </li>
        );
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const { viewStore, todo } = this.props;

        try {
            const value = this.editText.trim();
            if (value) {
                await todo.setText(value);
                this.editText = value;
            } else {
                await this.handleDestroy();
            }
            viewStore.todoBeingEdited = null; 
        } catch (e) {
            console.log(`handleSubmit ${e}`);
        }
	};

    // update todo
    handleEdit = () => {
        const { viewStore, todo } = this.props;
        viewStore.todoBeingEdited = todo;
        this.editText = todo.text;
    };

    // removes todo
    handleDestroy = () => {
        const { viewStore, todo } = this.props;
		todo.destroy();
		viewStore.todoBeingEdited = null;
    };
    
    // toggle completed value
    handleToggle = () => {
		this.props.todo.toggle();
	};

    handleKeyDown = event => {
        const { viewStore, todo } = this.props;

		if (event.which === ESCAPE_KEY) {
			this.editText = todo.text;
			viewStore.todoBeingEdited = null;
		} else if (event.which === ENTER_KEY) {
			this.handleSubmit(event);
		}
	};
    
    handleChange = event => {
        this.editText = event.target.value;
	};
}

TodoItem.propTypes = {
	todo: PropTypes.object.isRequired,
	viewStore: PropTypes.object.isRequired
};

export default observer(TodoItem);
