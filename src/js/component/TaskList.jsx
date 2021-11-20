import React from "react";
import { GlobalContext } from "../context/GlobalState.js";
import { Task } from "./Task.jsx";

export const TaskList = () => {
	const { userName, tasks, getTodos } = React.useContext(GlobalContext);
	const pendingTasks = tasks.filter(task => task.done === !true);
	React.useEffect(() => {
		getTodos(userName);
	}, []);
	return (
		<>
			<ul className="task-list">
				{tasks.map((task, i) =>
					i == 0 ? "" : <Task key={i} task={task} />
				)}
			</ul>
			<span className="muted-text">
				{pendingTasks.length == 0
					? `No tasks, add a task`
					: `${pendingTasks.length - 1} items left`}
			</span>
		</>
	);
};
