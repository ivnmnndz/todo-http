import React, { useContext } from "react";
import PropTypes from "prop-types";
import { GlobalContext } from "../context/GlobalState";

export const Task = ({ task }) => {
	const { deleteTask, completeTask } = useContext(GlobalContext);

	return (
		<li className="task-item">
			<div className="task-text-box">
				<span className="muted-text">{task.created}</span>
				<br></br>
				<span>{task.label}</span>
			</div>
			<div className="button-box">
				{task.done === false ? (
					<button onClick={() => completeTask(task.id)} type="button">
						<i className="far fa-check-circle"></i>
					</button>
				) : (
					<span>
						<i className="far fa-thumbs-up"></i>
					</span>
				)}
				<button onClick={() => deleteTask(task.id)} type="button">
					<i className="far fa-trash-alt"></i>
				</button>
			</div>
		</li>
	);
};

Task.propTypes = {
	task: PropTypes.object
};
