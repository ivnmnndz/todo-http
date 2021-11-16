import React, { useContext } from "react";
import PropTypes from "prop-types";
import { GlobalContext } from "../context/GlobalState";

export const Task = ({ task }) => {
	const { deleteTask, completeTask, editTodos } = useContext(GlobalContext);

	const handleComplete = () => {
		completeTask(task.id);
		editTodos();
	};
	const handleDelete = () => {
		deleteTask(task.id);
		editTodos();
	};

	return (
		<li className="task-item">
			<div className="task-text-box">
				<span>{task.label}</span>
			</div>
			<div className="button-box">
				{task.done === false ? (
					<button onClick={handleComplete} type="button">
						<i className="far fa-check-circle"></i>
					</button>
				) : (
					<span>
						<i className="far fa-thumbs-up"></i>
					</span>
				)}
				<button onClick={handleDelete} type="button">
					<i className="far fa-trash-alt"></i>
				</button>
			</div>
		</li>
	);
};

Task.propTypes = {
	task: PropTypes.object
};
