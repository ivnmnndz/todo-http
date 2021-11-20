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
	function addUser(userName) {
		postUser(userName)
			.then(() => {
				dispatch({
					type: "ADD_USER",
					payload: userName
				});
			})
			.catch(err => {
				console.error("error", err);
			});
	}

	function removeUser(userName) {
		deleteUser(state.userName).then(() => {
			dispatch({
				type: "DELETE_USER",
				payload: userName
			});
		});
	}

	function getList(tasks) {
		dispatch({
			type: "GET_LIST",
			payload: tasks
		});
	}

	function addTask(task) {
		editTodos([...state.tasks, task]).then(() => {
			dispatch({
				type: "ADD_TASK",
				payload: task
			});
		});
	}

	function deleteTask(id) {
		editTodos(state.tasks.filter(task => task.id !== id))
			.then(() => {
				dispatch({
					type: "DELETE_TASK",
					payload: id
				});
			})
			.catch(err => {
				//catch errors
				console.error("error", err);
			});
	}

	function completeTask(id) {
		editTodos(
			state.tasks.map(item => {
				if (item.id === id) {
					return {
						...item,
						done: true
					};
				} else {
					return item;
				}
			})
		).then(() => {
			dispatch({
				type: "COMPLETE_TASK",
				payload: id
			});
		});
	}

	// api calls
	const getTodos = userName => {
		debugger;
		return fetch(
			`https://assets.breatheco.de/apis/fake/todos/user/${userName}`
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

	const editTodos = tasks => {
		return fetch(
			`https://assets.breatheco.de/apis/fake/todos/user/${state.userName}`,
			{
				method: "PUT",
				body: JSON.stringify(tasks),
				headers: {
					"Content-Type": "application/json"
				}
			}
		).then(resp => {
			// if response is not ok print an error
			if (!resp.ok) {
				throw new Error("response not ok");
			}
			console.log(resp);
			// or return a promise
			return resp.json();
		});
	};
	const postUser = userName => {
		return fetch(
			`https://assets.breatheco.de/apis/fake/todos/user/${userName}`,
			{
				method: "POST",
				body: JSON.stringify([]),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(resp => {
				// if response is not ok print an error
				if (!resp.ok) {
					console.log("response not ok", resp);
				}
				// or return a promise
				return resp.json();
			})
			.catch(err => {
				//catch errors
				console.log("error");
			});
	};

	const deleteUser = userName => {
		return fetch(
			`https://assets.breatheco.de/apis/fake/todos/user/${userName}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
	};

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
				addUser,
				removeUser
			}}>
			{children}
		</GlobalContext.Provider>
	);
};

// validate properties
GlobalProvider.propTypes = {
	children: PropTypes.object
};
