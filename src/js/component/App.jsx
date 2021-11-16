import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState.js";
import { TaskForm } from "./TaskForm.jsx";
import { Header } from "./Header.jsx";
import { TaskList } from "./TaskList.jsx";

export const App = () => {
	const { userName } = useContext(GlobalContext);
	return (
		<>
			<Header />
			{userName ? (
				<>
					<TaskForm />
					<TaskList />
				</>
			) : null}
		</>
	);
};
