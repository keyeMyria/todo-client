import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import stores from './store';
import './index.css';
import TodoApp from '@/components/TodoApp';
import { setAuthorizationToken } from "@/utils";

//const token = localStorage.getItem("token");
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YWIxNTkyOTNmODMyMjJmMzA1ZmM4ZjkiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTIxNjIxOTU4fQ.HR6Y4KxDRju8t6HhR-RJoZFqKyCKryhbwjlScdQpjj4';
if (token !== null) {
	setAuthorizationToken(token);
}

ReactDOM.render(
	<Provider {...stores}>
		<TodoApp />
	</Provider>,
	document.getElementById('root')
);
