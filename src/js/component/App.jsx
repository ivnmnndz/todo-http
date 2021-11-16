import React from "react";
import { GlobalProvider } from "../context/GlobalState.js";
import { TaskForm } from "./TaskForm.jsx";
import { Header } from "./Header.jsx";
import { TaskList } from "./TaskList.jsx";

export const App = () => {
	return (
		<GlobalProvider>
			<Header />
			<TaskForm />
			<TaskList />
		</GlobalProvider>
	);
};
