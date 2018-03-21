import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import TodoOverview from '@/components/TodoOverview';
import TodoEntry from '@/components/TodoEntry';
import TodoFooter from '@/components/TodoFooter';

import DevTool from 'mobx-react-devtools';


class TodoApp extends Component {

    componentDidMount() {
        this.props.todoStore.loadTodos();
    }

	render() {
        const { todoStore, viewStore } = this.props;
		
		return (
			<div>
				<DevTool />
				<header className="header">
					<h1>zadania</h1>
                    <TodoEntry todoStore={todoStore} />
				</header>
                <TodoOverview todoStore={todoStore} viewStore={viewStore} />
                <TodoFooter todoStore={todoStore} viewStore={viewStore} />
			</div>
		);
	}
}

export default inject('todoStore', 'viewStore')(observer(TodoApp));
