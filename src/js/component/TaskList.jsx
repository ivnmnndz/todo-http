import React, { useEffect, useContext } from "react";
import { getTodos } from "../api/getTodos.js";
import { GlobalContext } from "../context/GlobalState.js";
import { Task } from "./Task.jsx";

export const TaskList = () => {
	const { tasks } = useContext(GlobalContext);
	const pendingTasks = tasks.filter(task => task.done === !true);

	return (
		<>
			<ul className="task-list">
				{tasks.map(task => (
					<Task key={task.id} task={task} />
				))}
			</ul>
			<span className="muted-text">
				{pendingTasks.length == 0
					? `No tasks, add a task`
					: `${pendingTasks.length} items left`}
			</span>
		</>
	);
};
