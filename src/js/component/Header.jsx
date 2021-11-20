import React, { useContext, useRef } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Header = () => {
	const { userName, addUser, removeUser } = useContext(GlobalContext);

	const userNameRef = useRef();

	const handleAddUser = e => {
		e.preventDefault();
		addUser(userNameRef.current.value);
	};

	const handleRemoveUser = e => {
		e.preventDefault();
		removeUser(userName);
	};

	return (
		<>
			{!userName ? (
				<form onSubmit={handleAddUser}>
					<input
						ref={userNameRef}
						type="text"
						placeholder="Add your username"
					/>
				</form>
			) : (
				<>
					<header>
						<h2>{userName}&apos;s To-Do List</h2>
					</header>
					<div>
						<button onClick={handleRemoveUser}>delete user</button>
					</div>
				</>
			)}
		</>
	);
};
