import React, { useEffect, createContext, useReducer } from "react";
import PropTypes from "prop-types";
import AppReducer from "./AppReducer.js";
import { getTodos } from "../api/getTodos.js";

// define initial state
const initialState = {
	tasks: []
};

//create context
export const GlobalContext = createContext(initialState);

//export a provider component to wrap children components
export const GlobalProvider = ({ children }) => {
	//create useReducer state
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// define actions
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

	useEffect(() => {
		getTodos();
		return () => {
			//cleanup
		};
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				tasks: state.tasks,
				addTask,
				deleteTask,
				completeTask
			}}>
			{children}
		</GlobalContext.Provider>
	);
};

// validate properties
GlobalProvider.propTypes = {
	children: PropTypes.array
};
