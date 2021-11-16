import React, { useContext, useRef } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Header = () => {
	const { userName, postUser, addUser } = useContext(GlobalContext);
	const userNameRef = useRef();
	const handleUserSubmit = e => {
		e.preventDefault();
		addUser(userNameRef.current.value);
		postUser();
	};
	return (
		<>
			{!userName ? (
				<form onSubmit={handleUserSubmit}>
					<input
						ref={userNameRef}
						type="text"
						placeholder="Add your username"
					/>
				</form>
			) : (
				<header>
					<h2>Ivan&apos;s To-Do List</h2>
				</header>
			)}
		</>
	);
};
