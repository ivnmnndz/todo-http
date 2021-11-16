export const editTodos = () => {
	fetch(`https://assets.breatheco.de/apis/fake/todos/user/iiii`, {
		method: "PUT",
		body: JSON.stringify(), //what goes here?
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(resp => {
			// if response is not ok print an error
			if (!resp.ok) {
				throw Error("could not fetch");
			}
			// or return a promise
			return resp.json();
		})
		.then(data => {
			// set state to fetched data
			console.log(data);
		})
		.catch(err => {
			//catch errors
			if (err) {
				throw Error("error");
			}
		});
};
