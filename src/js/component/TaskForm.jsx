import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState.js";

export const TaskForm = () => {
	const [content, setContent] = useState("");

	const { tasks, addTask, getTodos } = useContext(GlobalContext);

	const newID = Math.floor(Math.random() * 10000000);

	const onSubmitHandler = event => {
		event.preventDefault();
		const newTask = {
			id: newID,
			label: content.trim(),
			done: false
		};
		addTask(newTask);
		setContent("");
	};

	return (
		<form className="task-form" onSubmit={onSubmitHandler}>
			<input
				placeholder="Add Task"
				value={content}
				onChange={event => setContent(event.target.value)}
				onKeyPress={event => {
					if (event.key === "Enter") {
						onSubmitHandler;
					}
				}}
				required
			/>
			<button type="submit">
				<i className="far fa-plus-square"></i>
			</button>
		</form>
	);
};
