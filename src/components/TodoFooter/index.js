import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '@/constants';

class TodoFooter extends React.Component {

    render () {
        const { todoStore } = this.props;

        if (!todoStore.activeTodoCount && !todoStore.completedCount)
            return null;
            
        const activeTodoWord = todoStore.activeTodoCount === 1 ? 'zadanie' : 'zadań';

        return (
            <footer className="footer">
				<span className="todo-count">
					<strong>{todoStore.activeTodoCount}</strong> {`${activeTodoWord} pozostało`}
				</span>
                <ul className="filters">
					{this.renderFilterLink(ALL_TODOS, "Wszystkie")}
					{this.renderFilterLink(ACTIVE_TODOS, "Aktywne")}
					{this.renderFilterLink(COMPLETED_TODOS, "Zakończone")}
				</ul>
            </footer>
        );
    }

    renderFilterLink = (filterName, caption) => {
        const { viewStore } = this.props;
        const isSelected = filterName === viewStore.todoFilter;
		return (
            <li>
                <a className={classnames({ 'selected': isSelected })}
                    onClick={() => viewStore.setFilter(filterName)}>
                    {caption}
                </a>
                {' '}
            </li>
        );
	}
}

TodoFooter.propTypes = {
	viewStore: PropTypes.object.isRequired,
	todoStore: PropTypes.object.isRequired
}

export default observer(TodoFooter);
