export default (state, action) => {
	switch (action.type) {
		case "GET_LIST":
			return {
				...state,
				tasks: action.payload
			};

		case "ADD_USER":
			return {
				...state,
				userName: action.payload
			};

		case "DELETE_USER":
			return {
				...state,
				userName: ""
			};

		case "ADD_TASK":
			return {
				...state,
				tasks: [...state.tasks, action.payload]
			};

		case "DELETE_TASK":
			return {
				...state,
				tasks: state.tasks.filter(task => task.id !== action.payload)
			};

		case "COMPLETE_TASK":
			return {
				...state,
				tasks: state.tasks.map(item => {
					if (item.id === action.payload) {
						return {
							...item,
							done: true
						};
					} else {
						return item;
					}
				})
			};

		default:
			return state;
	}
};
