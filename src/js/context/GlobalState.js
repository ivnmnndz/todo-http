import React, { useEffect, createContext, useReducer } from "react";
import PropTypes from "prop-types";
import AppReducer from "./AppReducer.js";

// define initial state
const initialState = {
	userName: "",
	tasks: []
};

//create context
export const GlobalContext = createContext(initialState);

//export a provider component to wrap children components
export const GlobalProvider = ({ children }) => {
	//create useReducer state
	const [state, dispatch] = useReducer(AppReducer, initialState);
	// define actions
	function getList(tasks) {
		dispatch({
			type: "GET_LIST",
			payload: tasks
		});
	}
	function addUser(userName) {
		dispatch({
			type: "ADD_USER",
			payload: userName
		});
	}

	function addTask(task) {
		dispatch({
			type: "ADD_TASK",
			payload: task
		});
	}

	function deleteTask(id) {
		dispatch({
			type: "DELETE_TASK",
			payload: id
		});
	}

	function completeTask(id) {
		dispatch({
			type: "COMPLETE_TASK",
			payload: id
		});
	}
	// api calls
	const getTodos = () => {
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/iiii`)
			.then(resp => {
				// if response is not ok print an error
				if (!resp.ok) {
					console.log("response not ok");
				}
				// or return a promise
				return resp.json();
			})
			.then(data => {
				//resolve promise into data
				// set state with fetched data
				getList(data);
				// console.log(data);
			})
			.catch(err => {
				//catch errors
				console.log("error");
			});
	};

	const postUser = () => {
		fetch(
			`https://assets.breatheco.de/apis/fake/todos/user/${state.userName}`,
			{
				method: "POST",
				body: [],
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(resp => {
				// if response is not ok print an error
				if (!resp.ok) {
					console.log("response not ok");
				}
				// or return a promise
				return resp.json();
			})
			.then(data => {
				// set state to fetched data
				console.log(data);
			})
			.catch(err => {
				//catch errors
				console.log("error");
			});
	};
	const editTodos = () => {
		console.log(state.tasks);
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/iiii`, {
			method: "PUT",
			body: JSON.stringify(state.tasks),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				// if response is not ok print an error
				if (!resp.ok) {
					console.log("response not ok");
				}
				// or return a promise
				return resp.json();
			})
			.then(data => {
				// set state to fetched data
				console.log(data);
			})
			.catch(err => {
				//catch errors
				console.log("error");
			});
	};

	useEffect(() => {
		state.userName ? getTodos() : null;
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				userName: state.userName,
				tasks: state.tasks,
				addTask,
				deleteTask,
				completeTask,
				getTodos,
				editTodos,
				postUser
			}}>
			{children}
		</GlobalContext.Provider>
	);
};

// validate properties
GlobalProvider.propTypes = {
	children: PropTypes.object
};
